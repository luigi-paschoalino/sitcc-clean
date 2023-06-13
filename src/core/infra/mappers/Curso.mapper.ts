import { Curso } from '../../domain/Curso'
import { CursoModel } from '../models/Curso.model'

export class CursoMapper {
    constructor() {}

    domainToModel(domain: Curso): CursoModel {
        const model = CursoModel.create({
            id: domain.getId(),
            nome: domain.getNome(),
            codigo: domain.getCodigo(),
        })

        return model
    }

    modelToDomain(model: CursoModel): Curso {
        const domain = Curso.criar(
            {
                nome: model.nome,
                codigo: model.codigo,
            },
            model.id,
        )
        return domain
    }
}
