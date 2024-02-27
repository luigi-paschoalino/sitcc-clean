import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PerfilProfessor } from '../../domain/PerfilProfessor'
import { TIPO_USUARIO } from '../../domain/Usuario'
import { UsuarioCadastradoEvent } from '../../domain/events/UsuarioCadastrado.event'
import { CodigoProfessorRepository } from '../../domain/repositories/CodigoProfessor.repository'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'

@EventsHandler(UsuarioCadastradoEvent)
export class CriarPerfilProfessorHandler
    implements IEventHandler<UsuarioCadastradoEvent>
{
    private logger = new Logger(CriarPerfilProfessorHandler.name)
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('CodigoProfessorRepository')
        private readonly codigoProfessorRepository: CodigoProfessorRepository,
    ) {}
    async handle(event: UsuarioCadastradoEvent): Promise<Error | void> {
        try {
            if (event.data.tipo === TIPO_USUARIO.PROFESSOR) {
                const codigoExiste =
                    await this.codigoProfessorRepository.buscarCodigo(
                        event.data.codigo,
                    )
                if (codigoExiste instanceof Error) throw codigoExiste

                const professor = await this.usuarioRepository.buscarPorId(
                    event.data.id,
                )
                if (professor instanceof Error) throw professor

                const perfilProfessor = PerfilProfessor.criar({
                    descricao: '',
                    link: '',
                })

                professor.setPerfilProfessor(perfilProfessor)

                const professorAtualizado = await this.usuarioRepository.salvar(
                    professor,
                )
                if (professorAtualizado instanceof Error)
                    throw professorAtualizado

                codigoExiste.consumirCodigo()

                const codigoAtualizado =
                    await this.codigoProfessorRepository.salvarCodigo(
                        codigoExiste,
                    )
                if (codigoAtualizado instanceof Error) throw codigoAtualizado
            }
        } catch (error) {
            this.logger.error(error)
            return error
        }
    }
}
