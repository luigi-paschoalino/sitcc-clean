import { Inject } from '@nestjs/common'
import { TfgException } from '../../../../shared/domain/exceptions/Tfg.exception'
import { STATUS_TFG, TIPO_ENTREGA } from '../../../domain/Tfg'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { MoverTfgService } from '../../../domain/services/MoverTfg.service'

export interface EnviarTfgParcialUsecaseProps {
    usuarioId: string
    tfgId: string
    path: string
}

export class EnviarTfgParcialUsecase {
    constructor(
        @Inject('TfgRepository') private readonly TfgRepository: TfgRepository,
        @Inject('MoverTfgService')
        private readonly moverTfgService: MoverTfgService,
        @Inject('EventPublisherService')
        private readonly eventPublisherService: EventPublisherService,
    ) {}

    async execute(props: EnviarTfgParcialUsecaseProps) {
        try {
            if (!props.path)
                throw new TfgException(
                    'Houve um problema com o arquivo enviado',
                )

            const tfg = await this.TfgRepository.buscarTfg(props.tfgId)
            if (tfg instanceof Error) throw tfg

            if (tfg.getAluno() !== props.usuarioId)
                throw new TfgException(
                    'O usuário informado não possui autoria sobre o TFG',
                )

            if (tfg.getStatus() !== STATUS_TFG.ORIENTACAO_ACEITA)
                throw new TfgException('A orientação do TFG não foi aprovada!')

            const service = await this.moverTfgService.execute({
                tfgId: props.tfgId,
                path: props.path,
                tipoEntrega: TIPO_ENTREGA.PARCIAL,
            })
            if (service instanceof Error) throw service

            tfg.enviarTfg(service, TIPO_ENTREGA.PARCIAL)

            const salvar = await this.TfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.eventPublisherService.publish(tfg)
        } catch (error) {
            return error
        }
    }
}
