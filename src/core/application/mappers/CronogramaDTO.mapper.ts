import { Injectable } from '@nestjs/common'
import { Cronograma } from '../../domain/Cronograma'
import { CronogramaDTO } from '../../domain/dtos/Cronograma.dto'
import { AtividadeDTOMapper } from './AtividadeDTO.mapper'

@Injectable()
export class CronogramaDTOMapper {
    constructor(private readonly atividadeMapper: AtividadeDTOMapper) {}

    toDTO(cronograma: Cronograma): CronogramaDTO {
        const atividades = cronograma.getAtividades().map((atividade) => {
            return this.atividadeMapper.toDTO(atividade)
        })

        return {
            id: cronograma.getId(),
            ano: cronograma.getAno(),
            semestre: cronograma.getSemestre(),
            atividades,
        }
    }
}
