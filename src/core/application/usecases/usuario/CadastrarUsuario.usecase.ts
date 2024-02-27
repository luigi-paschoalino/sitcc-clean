import { TIPO_USUARIO, Usuario } from '../../../domain/Usuario'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { UniqueIdService } from '../../../domain/services/UniqueID.service'
import { Inject, Logger } from '@nestjs/common'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { EncriptarSenhaService } from '../../../domain/services/EncriptarSenha.service'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'
import { CodigoProfessorRepository } from '../../../domain/repositories/CodigoProfessor.repository'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'

export interface CadastrarUsuarioUsecaseProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
    matricula: string
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
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
    ) {}

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

            const usuarios = await this.usuarioRepository.listar()
            if (usuarios instanceof Error) throw usuarios

            const existe = usuarios.find(
                (u) =>
                    u.getEmail() === props.email ||
                    u.getMatricula() === props.matricula,
            )
            if (existe)
                throw new InvalidPropsException(
                    `Já existe um usuário o email ou matrícula informados`,
                )

            const id = this.uniqueIdService.gerarUuid()

            const curso = await this.cursoRepository.buscarPorId(props.curso)
            if (curso instanceof Error)
                throw new InvalidPropsException('Curso não informado')

            const senha = await this.encriptarSenhaService.encriptar(
                props.senha,
            )

            const usuario = Usuario.criar(
                {
                    nome: props.nome,
                    curso: curso.getId(),
                    email: props.email,
                    senha: senha,
                    tipo: props.tipo,
                    numero: props.numero,
                    codigo: props.codigo,
                    matricula: props.matricula,
                },
                id,
            )
            if (usuario instanceof Error) throw usuario

            const salvarUsuario = await this.usuarioRepository.salvar(usuario)
            if (salvarUsuario instanceof Error) throw salvarUsuario

            await this.publisher.publish(usuario)
        } catch (error) {
            return error
        }
    }
}
