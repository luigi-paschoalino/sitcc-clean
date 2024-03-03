import { Inject, Injectable } from '@nestjs/common'
import { CursoDTO } from '../../domain/dtos/Curso.dto'
import { CursoRepository } from '../../domain/repositories/Curso.repository'
import { CursoDTOMapper } from '../mappers/CursoDTO.mapper'

@Injectable()
export class ListarCursosQuery {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        private readonly cursoDTOMapper: CursoDTOMapper,
    ) {}

    async execute(): Promise<Error | CursoDTO[]> {
        try {
            const cursos = await this.cursoRepository.listarCursos()

            if (cursos instanceof Error) throw cursos

            const cursosDTO: CursoDTO[] = []

            for (const c of cursos) cursosDTO.push(this.cursoDTOMapper.toDTO(c))

            return cursosDTO
        } catch (error) {
            return error
        }
    }
}
