import { Curso } from '../../domain/Curso'
import { Norma as PrismaNorma, Curso as PrismaCurso } from '@prisma/client'
import { NormaMapper } from './Norma.mapper'
import { CronogramaMapper, CronogramaModel } from './Cronograma.mapper'

interface CursoModel extends PrismaCurso {
    normas?: PrismaNorma[]
    cronogramas?: CronogramaModel[]
}

export class CursoMapper {
    constructor(
        private readonly normaMapper: NormaMapper,
        private readonly cronogramaMapper: CronogramaMapper,
    ) {}

    //TODO: Implementar o mapeamento de normas e cronogramas para o model
    domainToModel(domain: Curso): PrismaCurso {
        return {
            id: domain.getId(),
            nome: domain.getNome(),
            codigo: domain.getCodigo(),
        }
    }

    modelToDomain(model: CursoModel): Curso {
        const normasDomain = model.normas?.map((norma) =>
            this.normaMapper.modelToDomain(norma),
        )
        const cronogramasDomain = model.cronogramas?.map((cronograma) =>
            this.cronogramaMapper.modelToDomain(cronograma),
        )

        const domain = Curso.carregar(
            {
                nome: model.nome,
                codigo: model.codigo,
                normas: normasDomain ?? [],
                cronogramas: cronogramasDomain ?? [],
            },
            model.id,
        )
        return domain
    }
}
