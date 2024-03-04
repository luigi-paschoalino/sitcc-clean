import { Inject } from '@nestjs/common'
import { TIPO_USUARIO } from 'src/core/domain/Usuario'
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository'
import { UsuarioDTO } from '../../domain/dtos/Usuario.dto'
import { CursoRepository } from '../../domain/repositories/Curso.repository'
import { UsuarioDTOMapper } from '../mappers/UsuarioDTO.mapper'

export class ListarProfessoresQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        private readonly usuarioDTOMapper: UsuarioDTOMapper,
    ) {}

    async execute() {
        try {
            const professores = await this.usuarioRepository.buscarPorTipo(
                TIPO_USUARIO.PROFESSOR,
            )
            if (professores instanceof Error) throw professores

            const cursos = await this.cursoRepository.listarCursos()
            if (cursos instanceof Error) throw cursos

            const professoresDTO: UsuarioDTO[] = professores.map((p) => {
                return this.usuarioDTOMapper.toDTO(
                    p,
                    cursos.find((c) => c.getId() === p.getCurso()),
                )
            })
            return professoresDTO
        } catch (error) {
            return error
        }
    }
}
