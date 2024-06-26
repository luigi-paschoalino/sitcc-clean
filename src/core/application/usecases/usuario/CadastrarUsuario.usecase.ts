import { Inject } from '@nestjs/common'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'
import { TIPO_USUARIO, Usuario } from '../../../domain/Usuario'
import { CodigoProfessorRepository } from '../../../domain/repositories/CodigoProfessor.repository'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EncriptarSenhaService } from '../../../domain/services/EncriptarSenha.service'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

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
    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
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

                if (
                    !codigo.getDisponivel() ||
                    codigo.getEmail() !== props.email
                )
                    throw new InvalidPropsException(
                        'Código do professor inválido',
                    )
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

            const curso = await this.cursoRepository.buscarPorId(props.curso)
            if (curso instanceof Error)
                throw new InvalidPropsException('Curso não informado')

            const senha = await this.encriptarSenhaService.encriptar(
                props.senha,
            )

            const usuario = Usuario.criar({
                nome: props.nome,
                curso: curso.getId(),
                email: props.email,
                senha: senha,
                tipo: props.tipo,
                numero: props.numero,
                codigo: props.codigo,
                matricula: props.matricula,
            })
            if (usuario instanceof Error) throw usuario

            const salvarUsuario = await this.usuarioRepository.salvar(usuario)
            if (salvarUsuario instanceof Error) throw salvarUsuario

            await this.publisher.publish(usuario)
        } catch (error) {
            return error
        }
    }
}
