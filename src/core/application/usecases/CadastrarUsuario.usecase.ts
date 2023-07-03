import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { Inject, Logger } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'
import { EncriptarSenhaService } from '../../domain/services/EncriptarSenha.service'

export interface CadastrarUsuarioUsecaseProps {
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
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('EncriptarSenhaService')
        private readonly encriptarSenhaService: EncriptarSenhaService,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    //TODO: validar se o usuário já existe (email, matricula)
    async execute(props: CadastrarUsuarioUsecaseProps): Promise<Error | void> {
        try {
            this.logger.debug(props)

            const id = this.uniqueIdService.gerarUuid()

            const curso = await this.universidadeRepository.buscarCurso(
                props.curso,
            )
            if (curso instanceof Error) throw curso

            const senha = await this.encriptarSenhaService.encriptar(
                props.senha,
            )

            const usuario = Usuario.criar(
                {
                    nome: props.nome,
                    curso,
                    email: props.email,
                    senha: senha,
                    tipo: props.tipo,
                    numero: props.numero,
                },
                id,
            )
            if (usuario instanceof Error) throw usuario

            this.logger.debug(JSON.stringify(usuario))

            const salvarUsuario = await this.usuarioRepository.salvar(usuario)
            if (salvarUsuario instanceof Error) throw salvarUsuario

            await this.publisher.publish(usuario)
        } catch (error) {
            return error
        }
    }
}
