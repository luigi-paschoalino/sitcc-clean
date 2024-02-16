import { Inject } from '@nestjs/common'
import { CursoDTO } from '../../domain/dtos/Curso.dto'
import { CursoRepository } from '../../domain/repositories/Curso.repository'

export class ListarCursosQuery {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
    ) {}

    async execute(): Promise<Error | CursoDTO[]> {
        try {
            const cursos = await this.cursoRepository.listarCursos()

            if (cursos instanceof Error) throw cursos

            const cursosDTO: CursoDTO[] = []
            for (const c of cursos) {
                const cursoDTO: CursoDTO = {
                    id: c.getId(),
                    nome: c.getNome(),
                    codigo: c.getCodigo(),
                }

                cursosDTO.push(cursoDTO)
            }

            return cursosDTO
        } catch (error) {
            return error
        }
    }
}
