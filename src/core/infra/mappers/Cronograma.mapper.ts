import { Cronograma, SEMESTRE } from '../../domain/Cronograma'
import {
    Atividade as PrismaAtividade,
    Cronograma as PrismaCronograma,
} from '@prisma/client'
import { AtividadeMapper } from './Atividade.mapper'

export interface CronogramaModel extends PrismaCronograma {
    atividades?: PrismaAtividade[]
}

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

    modelToDomain(model: CronogramaModel): Cronograma {
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
