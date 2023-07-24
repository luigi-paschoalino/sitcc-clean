import { Logger, Inject } from '@nestjs/common'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import {
    MoverTccService,
    TIPO_ENTREGA,
} from '../../domain/services/MoverTcc.service'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'
import { InvalidPropsException } from '../../domain/exceptions/InvalidProps.exception'
import { UsuarioException } from '../../domain/exceptions/Usuario.exception'
import { TccException } from '../../domain/exceptions/Tcc.exception'
import { STATUS_TCC } from '../../domain/Tcc'

export interface EnviarTccParcialUsecaseProps {
    usuarioId: string
    titulo: string
    tccId: string
    path: string
}

export class EnviarTccParcialUsecase {
    private logger = new Logger(EnviarTccParcialUsecase.name)

    constructor(
        @Inject('TccRepository') private readonly tccRepository: TccRepository,
        @Inject('MoverTccService')
        private readonly moverTccService: MoverTccService,
        @Inject('EventPublisherService')
        private readonly eventPublisherService: EventPublisherService,
    ) {}

    async execute(props: EnviarTccParcialUsecaseProps) {
        try {
            const tcc = await this.tccRepository.buscarTcc(props.tccId)
            if (tcc instanceof Error) throw tcc

            if (tcc.getAluno() !== props.usuarioId)
                throw new TccException(
                    'O usuário informado não possui autoria sobre o TCC',
                )

            if (tcc.getStatus() !== STATUS_TCC.ORIENTACAO_ACEITA)
                throw new TccException('A orientação do TCC não foi aprovada!')

            this.logger.debug('\n' + JSON.stringify(tcc, null, 2))

            const service = await this.moverTccService.execute({
                tccId: props.tccId,
                path: props.path,
                tipoEntrega: TIPO_ENTREGA.PARCIAL,
            })
            if (service instanceof Error) throw service

            tcc.enviarTcc(service, TIPO_ENTREGA.PARCIAL)

            const salvar = await this.tccRepository.salvarTcc(tcc)
            if (salvar instanceof Error) throw salvar

            await this.eventPublisherService.publish(tcc)
        } catch (error) {
            return error
        }
    }
}
