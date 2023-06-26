import { Banca } from '../../domain/Banca'
import { BancaModel } from '../models/Banca.model'

export class BancaMapper {
    constructor() {}

    domainToModel(domain: Banca): BancaModel {
        const model = BancaModel.create({
            id: domain.getId(),
            professorId: domain.getIdProfessor(),
            dia_hora: domain.getDiaHora(),
            nota_final: domain.getNotaFinal(),
            nota_apresentacao: domain.getNotaApresentacao(),
            nota_trabalho: domain.getNotaTrabalho(),
        })

        return model
    }

    modelToDomain(model: BancaModel): Banca {
        const domain = Banca.criar(
            {
                professorId: model.professorId,
                dia_hora: model.dia_hora,
                nota_final: model.nota_final,
                nota_apresentacao: model.nota_apresentacao,
                nota_trabalho: model.nota_trabalho,
            },
            model.id,
        )

        return domain
    }
}
