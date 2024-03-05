import { Inject, Injectable, Logger } from '@nestjs/common'
import { UsuarioDTO } from '../../domain/dtos/Usuario.dto'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { UsuarioDTOMapper } from '../mappers/UsuarioDTO.mapper'
import { CursoRepository } from '../../domain/repositories/Curso.repository'

type BuscarUsuarioHashResponse = UsuarioDTO

@Injectable()
export class BuscarUsuarioHashQuery {
    private logger = new Logger(BuscarUsuarioHashQuery.name)

    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        private readonly usuarioMapper: UsuarioDTOMapper,
    ) {}

    async execute(hash: string): Promise<Error | BuscarUsuarioHashResponse> {
        try {
            const usuario = await this.usuarioRepository.buscarPorHashSenha(
                hash,
            )
            if (usuario instanceof Error) throw usuario

            const curso = await this.cursoRepository.buscarPorId(
                usuario.getCurso(),
            )
            if (curso instanceof Error) throw curso

            this.logger.debug(JSON.stringify(usuario, null, 2))
            const usuarioDTO = this.usuarioMapper.toDTO(usuario, curso)

            return usuarioDTO
        } catch (error) {
            return error
        }
    }
}
