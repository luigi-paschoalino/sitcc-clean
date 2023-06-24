import { Cronograma } from '../../domain/Cronograma'
import { CronogramaModel } from '../models/Cronograma.model'

export class CronogramaMapper {
    constructor() {}

    domainToModel(domain: Cronograma): CronogramaModel {
        const model = CronogramaModel.create({
            id: domain.getId(),
            ano: domain.getAno(),
            semestre: domain.getSemestre(),
        })

        return model
    }

    modelToDomain(model: CronogramaModel): Cronograma {
        const domain = Cronograma.criar(
            {
                ano: model.ano,
                semestre: model.semestre,
            },
            model.id,
        )

        return domain
    }
}
