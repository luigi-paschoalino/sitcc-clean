import { Inject } from '@nestjs/common'
import { CursoRepository } from '../../domain/repositories/Curso.repository'
import { CursoDTOMapper } from '../mappers/CursoDTO.mapper'
import { CronogramaDTO } from '../../domain/dtos/Cronograma.dto'

export interface BuscarCronogramasQueryProps {
    id: string
}

export class BuscarCronogramasQuery {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        private readonly cursoDTOMapper: CursoDTOMapper,
    ) {}

    async execute(
        props: BuscarCronogramasQueryProps,
    ): Promise<Error | CronogramaDTO[]> {
        try {
            const curso = await this.cursoRepository.buscarPorId(props.id)
            if (curso instanceof Error) throw curso

            const cursoDTO = this.cursoDTOMapper.toDTO(curso)
            return cursoDTO.cronogramas
        } catch (error) {
            return error
        }
    }
}
