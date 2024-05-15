import { Injectable } from '@nestjs/common'
import { Curso } from '../../domain/Curso'
import { CursoDTO } from '../../domain/dtos/Curso.dto'
import { CronogramaDTOMapper } from './CronogramaDTO.mapper'
import { NormaDTOMapper } from './NormaDTO.mapper'

@Injectable()
export class CursoDTOMapper {
    constructor(
        private readonly cronogramaMapper: CronogramaDTOMapper,
        private readonly normaMapper: NormaDTOMapper,
    ) {}

    toDTO(curso: Curso): CursoDTO {
        const cronogramas = curso.getCronogramas().map((cronograma) => {
            return this.cronogramaMapper.toDTO(cronograma)
        })
        const normas = curso.getNormas().map((norma) => {
            return this.normaMapper.toDTO(norma)
        })

        return {
            id: curso.getId(),
            nome: curso.getNome(),
            codigo: curso.getCodigo(),
            cronogramas,
            normas,
        }
    }
}
