import { Inject } from '@nestjs/common'
import { CursoRepository } from '../../domain/repositories/Curso.repository'
import { CronogramaDTO } from '../../domain/dtos/Cronograma.dto'
import { CronogramaDTOMapper } from '../mappers/CronogramaDTO.mapper'
import { CursoException } from '../../../shared/domain/exceptions/Curso.exception'

export interface BuscarCronogramaVigenteQueryProps {
    id: string
}

export class BuscarCronogramaVigenteQuery {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        private readonly cronogramaDTO: CronogramaDTOMapper,
    ) {}

    async execute(
        props: BuscarCronogramaVigenteQueryProps,
    ): Promise<Error | CronogramaDTO> {
        try {
            const curso = await this.cursoRepository.buscarPorId(props.id)
            if (curso instanceof Error) throw curso

            const cronogramaVigente = curso.getCronogramaVigente()
            if (!cronogramaVigente)
                throw new CursoException('O curso não possui cronograma')

            return this.cronogramaDTO.toDTO(cronogramaVigente)
        } catch (error) {
            return error
        }
    }
}
