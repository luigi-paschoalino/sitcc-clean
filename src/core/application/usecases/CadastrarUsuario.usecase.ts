import { EventPublisher } from '@nestjs/cqrs'
import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { Inject, Logger } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'

export interface CadastrarUsuarioUseCaseProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
}

export class CadastrarUsuarioUseCase {
    private logger = new Logger(CadastrarUsuarioUseCase.name)

    constructor(
        private readonly eventPublisher: EventPublisher,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    //TODO: validar se o usuário já existe (email, matricula)
    async execute(props: CadastrarUsuarioUseCaseProps): Promise<Error | void> {
        try {
            this.logger.debug(props)

            const id = this.uniqueIdService.gerarUuid()

            const curso = await this.universidadeRepository.buscarCurso(
                props.curso,
            )
            if (curso instanceof Error) throw curso

            const usuario = Usuario.criar(
                {
                    nome: props.nome,
                    curso,
                    email: props.email,
                    senha: props.senha,
                    tipo: props.tipo,
                    numero: props.numero,
                },
                id,
            )
            if (usuario instanceof Error) throw usuario

            this.logger.debug(JSON.stringify(usuario))

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
