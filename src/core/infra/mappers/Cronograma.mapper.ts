import { Cronograma, SEMESTRE } from '../../domain/Cronograma'
import { Cronograma as PrismaCronograma } from '@prisma/client'
import { AtividadeMapper } from './Atividade.mapper'
import { CronogramaInfraDTO } from '../../../shared/infra/database/prisma/dtos/Cronograma.dto'

export class CronogramaMapper {
    constructor(private readonly atividadeMapper: AtividadeMapper) {}

    domainToModel(domain: Cronograma, cursoId: string): PrismaCronograma {
        return {
            id: domain.getId(),
            ano: domain.getAno(),
            semestre: domain.getSemestre(),
            cursoId,
        }
    }

    modelToDomain(model: CronogramaInfraDTO): Cronograma {
        const atividadesDomain = model.atividades?.map((atividade) => {
            return this.atividadeMapper.modelToDomain(atividade)
        })

        const domain = Cronograma.carregar(
            {
                ano: model.ano,
                semestre: model.semestre as SEMESTRE,
                atividades: atividadesDomain,
            },
            model.id,
        )

        return domain
    }
}
