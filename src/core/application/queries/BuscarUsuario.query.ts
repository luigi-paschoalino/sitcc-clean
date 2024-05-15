import { Inject, Injectable } from '@nestjs/common'
import { UsuarioDTO } from '../../domain/dtos/Usuario.dto'
import { CursoRepository } from '../../domain/repositories/Curso.repository'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { UsuarioDTOMapper } from '../mappers/UsuarioDTO.mapper'

@Injectable()
export class BuscarUsuarioQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        private readonly usuarioDTOMapper: UsuarioDTOMapper,
    ) {}

    async execute(id: string): Promise<Error | UsuarioDTO> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(id)
            if (usuario instanceof Error) throw usuario

            const curso = await this.cursoRepository.buscarPorId(
                usuario.getCurso(),
            )
            if (curso instanceof Error) throw curso

            const dto = this.usuarioDTOMapper.toDTO(usuario, curso)

            return dto
        } catch (error) {
            return error
        }
    }
}
