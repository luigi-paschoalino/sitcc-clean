import { Inject } from '@nestjs/common'
import { CursoRepository } from '../../domain/repositories/Curso.repository'
import { CursoDTO } from '../dtos/Curso.dto'

export interface BuscarCursoQueryProps {
    id: string
}

export class BuscarCursoQuery {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
    ) {}

    async execute(props: BuscarCursoQueryProps): Promise<Error | CursoDTO> {
        try {
            const curso = await this.cursoRepository.buscarPorId(props.id)

            if (curso instanceof Error) throw curso

            const cursoDTO: CursoDTO = {
                id: curso.getId(),
                nome: curso.getNome(),
                codigo: curso.getCodigo(),
            }

            return cursoDTO
        } catch (error) {
            return error
        }
    }
}
