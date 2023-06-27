import { PerfilProfessorModel } from '../models/PerfilProfessor.model'
import { PerfilProfessor } from './../../domain/PerfilProfessor'
import { ProjetoMapper } from './Projeto.mapper'
export class PerfilProfessorMapper {
    constructor(private readonly projetoMapper: ProjetoMapper) {}

    domainToModel(domain: PerfilProfessor): PerfilProfessorModel {
        const model = PerfilProfessorModel.create({
            id: domain.getId(),
            descricao: domain.getDescricao(),
            link: domain.getLink(),
            projetos: domain
                .getProjetos()
                .map((projeto) => this.projetoMapper.domainToModel(projeto)),
        })

        return model
    }

    modelToDomain(model: PerfilProfessorModel): PerfilProfessor {
        const domain = PerfilProfessor.criar(
            {
                descricao: model.descricao,
                link: model.link,
                projetos: model.projetos.map((projeto) =>
                    this.projetoMapper.modelToDomain(projeto),
                ),
            },
            model.id,
        )

        return domain
    }
}
