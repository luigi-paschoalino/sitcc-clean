import { Inject, Logger } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository'

export interface AtualizarSenhaUsecaseProps {
    usuarioId: string
    hashSenha: string
    senha: string
    confirmacaoSenha: string
}

export class AtualizarSenhaUsecase {
    private logger = new Logger(AtualizarSenhaUsecase.name)

    constructor(
        private readonly eventPublisher: EventPublisher,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: AtualizarSenhaUsecaseProps): Promise<Error | void> {
        try {
            this.logger.debug(props)

            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) throw usuario

            const atualizarSenha = usuario.atualizarSenha(
                props.hashSenha,
                props.senha,
                props.confirmacaoSenha,
            )
            if (atualizarSenha instanceof Error) throw atualizarSenha

            const salvarUsuario = await this.usuarioRepository.salvar(usuario)
            if (salvarUsuario instanceof Error) throw salvarUsuario

            this.eventPublisher.mergeObjectContext(usuario)
            usuario.commit()

            return
        } catch (error) {
            return error
        }
    }
}
