import { PerfilProfessorModel } from '../models/PerfilProfessor.model'
import { PerfilProfessor } from './../../domain/PerfilProfessor'
export class PerfilProfessorMapper {
    constructor() {}

    domainToModel(domain: PerfilProfessor): PerfilProfessorModel {
        const model = PerfilProfessorModel.create({
            id: domain.getId(),
            descricao: domain.getDescricao(),
            link: domain.getLink(),
        })

        return model
    }

    modelToDomain(model: PerfilProfessorModel): PerfilProfessor {
        const domain = PerfilProfessor.criar(
            {
                descricao: model.descricao,
                link: model.link,
            },
            model.id,
        )

        return domain
    }
}
