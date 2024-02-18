import { Logger, Inject } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import {
    MoverTfgService,
    TIPO_ENTREGA,
} from '../../../domain/services/MoverTfg.service'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { TfgException } from '../../../domain/exceptions/Tfg.exception'
import { STATUS_TFG } from '../../../domain/Tfg'

export interface EnviarTfgParcialUsecaseProps {
    usuarioId: string
    titulo: string
    tfgId: string
    path: string
}

export class EnviarTfgParcialUsecase {
    private logger = new Logger(EnviarTfgParcialUsecase.name)

    constructor(
        @Inject('TfgRepository') private readonly TfgRepository: TfgRepository,
        @Inject('MoverTfgService')
        private readonly moverTfgService: MoverTfgService,
        @Inject('EventPublisherService')
        private readonly eventPublisherService: EventPublisherService,
    ) {}

    async execute(props: EnviarTfgParcialUsecaseProps) {
        try {
            const Tfg = await this.TfgRepository.buscarTfg(props.tfgId)
            if (Tfg instanceof Error) throw Tfg

            if (Tfg.getAluno() !== props.usuarioId)
                throw new TfgException(
                    'O usuário informado não possui autoria sobre o Tfg',
                )

            if (Tfg.getStatus() !== STATUS_TFG.ORIENTACAO_ACEITA)
                throw new TfgException('A orientação do Tfg não foi aprovada!')

            this.logger.debug('\n' + JSON.stringify(Tfg, null, 2))

            const service = await this.moverTfgService.execute({
                tfgId: props.tfgId,
                path: props.path,
                tipoEntrega: TIPO_ENTREGA.PARCIAL,
            })
            if (service instanceof Error) throw service

            Tfg.enviarTfg(service, TIPO_ENTREGA.PARCIAL)

            const salvar = await this.TfgRepository.salvarTfg(Tfg)
            if (salvar instanceof Error) throw salvar

            await this.eventPublisherService.publish(Tfg)
        } catch (error) {
            return error
        }
    }
}
