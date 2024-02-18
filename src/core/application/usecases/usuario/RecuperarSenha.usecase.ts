import { Inject, Logger } from '@nestjs/common'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { UniqueIdService } from '../../../domain/services/UniqueID.service'

export interface RecuperarSenhaUsecaseProps {
    email: string
}

export class RecuperarSenhaUsecase {
    private logger = new Logger(RecuperarSenhaUsecase.name)

    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
    ) {}

    async execute(props: RecuperarSenhaUsecaseProps): Promise<Error | void> {
        try {
            this.logger.debug('Recuperando senha')
            const hash = this.uniqueIdService.gerarUuid()

            const usuario = await this.usuarioRepository.buscarPorEmail(
                props.email,
            )
            if (usuario instanceof Error) throw usuario

            usuario.reiniciarSenha(hash)

            const salvar = await this.usuarioRepository.salvar(usuario)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(usuario)
        } catch (error) {
            return error
        }
    }
}
