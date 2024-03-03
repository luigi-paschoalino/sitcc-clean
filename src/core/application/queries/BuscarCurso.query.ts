import { Inject } from '@nestjs/common'
import { CursoRepository } from '../../domain/repositories/Curso.repository'
import { CursoDTO } from '../../domain/dtos/Curso.dto'
import { CursoDTOMapper } from '../mappers/CursoDTO.mapper'

export interface BuscarCursoQueryProps {
    id: string
}

export class BuscarCursoQuery {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        private readonly cursoDTOMapper: CursoDTOMapper,
    ) {}

    async execute(props: BuscarCursoQueryProps): Promise<Error | CursoDTO> {
        try {
            const curso = await this.cursoRepository.buscarPorId(props.id)

            if (curso instanceof Error) throw curso

            const cursoDTO = this.cursoDTOMapper.toDTO(curso)

            return cursoDTO
        } catch (error) {
            return error
        }
    }
}
