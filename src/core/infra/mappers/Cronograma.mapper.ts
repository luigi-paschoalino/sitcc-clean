import { Cronograma, SEMESTRE } from '../../domain/Cronograma'
import { AtividadeMapper } from './Atividade.mapper'
import { CronogramaInfraDTO } from '../../../shared/infra/database/prisma/dtos/Cronograma.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CronogramaMapper {
    constructor(private readonly atividadeMapper: AtividadeMapper) {}

    domainToModel(
        domain: Cronograma,
        cursoId: string,
    ): Error | CronogramaInfraDTO {
        const atividades = this.atividadeMapper.domainToModelList(
            domain.getAtividades(),
            domain.getId(),
        )
        if (atividades instanceof Error) return atividades
        return {
            id: domain.getId(),
            ano: domain.getAno(),
            semestre: domain.getSemestre(),
            atividades,
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
        try {
            const domain = modelList.map((cronograma) => {
                const cronogramaDomain = this.modelToDomain(cronograma)
                if (cronogramaDomain instanceof Error) throw cronogramaDomain
                return cronogramaDomain
            })

            return domain
        } catch (error) {
            return error
        }
    }

    domainToModelList(
        domainList: Cronograma[],
        cursoId: string,
    ): CronogramaInfraDTO[] {
        return domainList.map((cronograma) => {
            return {
                id: cronograma.getId(),
                ano: cronograma.getAno(),
                semestre: cronograma.getSemestre(),
                atividades: this.atividadeMapper.domainToModelList(
                    cronograma.getAtividades(),
                    cronograma.getId(),
                ),
                cursoId,
            }
        })
    }
}
