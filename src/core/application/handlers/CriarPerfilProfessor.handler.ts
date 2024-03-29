import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UsuarioCadastradoEvent } from '../../domain/events/UsuarioCadastrado.event'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../domain/Usuario'
import { CodigoProfessorRepository } from '../../domain/repositories/CodigoProfessor.repository'
import { PerfilProfessor } from '../../domain/PerfilProfessor'
import { UniqueIdService } from '../../domain/services/UniqueID.service'

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
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
    ) {}
    async handle(event: UsuarioCadastradoEvent): Promise<Error | void> {
        try {
            this.logger.warn('CHEGOU NO HANDLER! Props: \n', event.data)
            if (event.data.tipo === TIPO_USUARIO.PROFESSOR) {
                const codigoExiste =
                    await this.codigoProfessorRepository.buscarCodigo(
                        event.data.codigo,
                    )
                if (codigoExiste instanceof Error) throw codigoExiste

                this.logger.debug('1')

                const professor = await this.usuarioRepository.buscarPorId(
                    event.data.id,
                )
                if (professor instanceof Error) throw professor
                this.logger.debug('2')

                const id = this.uniqueIdService.gerarUuid()
                this.logger.debug('3')

                const perfilProfessor = PerfilProfessor.criar(
                    {
                        descricao: '',
                        link: '',
                    },
                    id,
                )
                this.logger.debug('4')

                professor.setPerfilProfessor(perfilProfessor)
                this.logger.debug('5')

                const professorAtualizado = await this.usuarioRepository.salvar(
                    professor,
                )
                if (professorAtualizado instanceof Error)
                    throw professorAtualizado
                this.logger.debug('6')

                codigoExiste.consumirCodigo()
                this.logger.debug('7')

                const codigoAtualizado =
                    await this.codigoProfessorRepository.salvarCodigo(
                        codigoExiste,
                    )
                if (codigoAtualizado instanceof Error) throw codigoAtualizado

                this.logger.debug('CHEGOU NO FINAL PORRAAAAAA')
            }
        } catch (error) {
            this.logger.error(error)
            return error
        }
    }
}
