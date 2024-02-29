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

    modelToDomain(model: CronogramaInfraDTO): Error | Cronograma {
        const atividades = this.atividadeMapper.modelToDomainList(
            model.atividades,
        )
        if (atividades instanceof Error) return atividades

        const domain = Cronograma.carregar(
            {
                ano: model.ano,
                semestre: model.semestre as SEMESTRE,
                atividades: atividades,
            },
            model.id,
        )

        return domain
    }

    modelToDomainList(modelList: CronogramaInfraDTO[]): Error | Cronograma[] {
        const domain = modelList.map((cronograma) => {
            const cronogramaDomain = this.modelToDomain(cronograma)
            if (cronogramaDomain instanceof Error) return cronogramaDomain
            return cronogramaDomain
        })

        return domain as Cronograma[]
    }
}
