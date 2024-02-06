import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { Inject, Logger } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Curso.repository'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'
import { EncriptarSenhaService } from '../../domain/services/EncriptarSenha.service'
import { InvalidPropsException } from '../../domain/exceptions/InvalidProps.exception'
import { CodigoProfessorRepository } from '../../domain/repositories/CodigoProfessor.repository'

export interface CadastrarUsuarioUsecaseProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
    codigo?: string
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
        @Inject('CodigoProfessorRepository')
        private readonly codigoProfessorRepository: CodigoProfessorRepository,
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    //TODO: validar se o usuário já existe (email, matricula)
    async execute(props: CadastrarUsuarioUsecaseProps): Promise<Error | void> {
        try {
            if (props.tipo === TIPO_USUARIO.PROFESSOR) {
                if (!props.codigo?.trim())
                    throw new InvalidPropsException(
                        'Código do professor não informado',
                    )

                const codigo =
                    await this.codigoProfessorRepository.buscarCodigo(
                        props.codigo,
                    )
                if (codigo instanceof Error) throw codigo
            }

            const id = this.uniqueIdService.gerarUuid()

            const curso = await this.universidadeRepository.buscarCurso(
                props.curso,
            )
            if (curso instanceof Error)
                throw new InvalidPropsException('Curso não informado')

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
                    codigo: props.codigo,
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
