import { Inject, Logger } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EventPublisher } from '@nestjs/cqrs'
import { TIPO_USUARIO } from 'src/core/domain/Usuario'
import { UsuarioException } from 'src/core/domain/exceptions/Usuario.exception'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface AvaliarNotaParcialUsecaseProps {
    professorId: string
    tfgId: string
    nota: number
}

export class AvaliarNotaParcialUsecase {
    private logger = new Logger(AvaliarNotaParcialUsecase.name)
    constructor(
        @Inject('TfgRepository') private readonly tfgRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(
        props: AvaliarNotaParcialUsecaseProps,
    ): Promise<Error | void> {
        try {
            const professor = await this.usuarioRepository.buscarPorId(
                props.professorId,
            )
            this.logger.debug(JSON.stringify(professor, null, 2))
            if (professor instanceof Error) throw professor
            if (professor.getTipo() !== TIPO_USUARIO.PROFESSOR)
                throw new UsuarioException('Usuário não é um professor')

            const tfg = await this.tfgRepository.buscarTfg(props.tfgId)
            if (tfg instanceof Error) throw tfg

            const aplicarNota = tfg.avaliarNotaParcial(
                props.professorId,
                props.nota,
            )
            if (aplicarNota instanceof Error) throw aplicarNota

            const salvar = await this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}
