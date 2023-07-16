import { Logger, Inject } from '@nestjs/common'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { MoverTccService } from '../../domain/services/MoverTcc.service'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'
import { InvalidPropsException } from '../../domain/exceptions/InvalidProps.exception'
import { UsuarioException } from '../../domain/exceptions/Usuario.exception'
import { TccException } from '../../domain/exceptions/Tcc.exception'

export interface EnviarTccParcialUsecaseProps {
    usuarioId: string
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

            const service = await this.moverTccService.execute({
                tccId: props.tccId,
                path: props.path,
            })
            if (service instanceof Error) throw service

            const salvar = await this.tccRepository.salvarTcc(tcc)
            if (salvar instanceof Error) throw salvar

            const publish = await this.eventPublisherService.publish(tcc)
        } catch (error) {
            return error
        }
    }
}
