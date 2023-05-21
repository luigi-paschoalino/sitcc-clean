import { EventPublisher } from '@nestjs/cqrs'
import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { Logger, Inject } from '@nestjs/common'
import { UsuarioException } from '../../domain/exceptions/Usuario.exception'

export interface CadastrarUsuarioUseCaseProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
}

export class CadastrarUsuarioUseCase {
    private logger = new Logger()

    constructor(
        private readonly eventPublisher: EventPublisher,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: CadastrarUsuarioUseCaseProps): Promise<Error | void> {
        try {
            const id = this.uniqueIdService.gerarUuid()

            const usuario = Usuario.criar(props, id)

            if (usuario instanceof Error)
                throw new UsuarioException(usuario.message)

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
