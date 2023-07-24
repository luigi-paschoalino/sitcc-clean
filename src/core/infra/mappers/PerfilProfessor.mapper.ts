import { PerfilProfessorModel } from '../models/PerfilProfessor.model'
import { PerfilProfessor } from './../../domain/PerfilProfessor'
import { AreasAtuacaoMapper } from './AreasAtuacao.mapper'
import { ProjetoMapper } from './Projeto.mapper'
export class PerfilProfessorMapper {
    constructor(
        private readonly projetoMapper: ProjetoMapper,
        private readonly areaAtuacaoMapper: AreasAtuacaoMapper,
    ) {}

    domainToModel(domain: PerfilProfessor): PerfilProfessorModel {
        const model = PerfilProfessorModel.create({
            id: domain.getId(),
            descricao: domain.getDescricao(),
            link: domain.getLink(),
            areasAtuacao: domain
                .getAreasAtuacao()
                ?.map((area) => this.areaAtuacaoMapper.domainToModel(area)),
            projetos: domain
                .getProjetos()
                ?.map((projeto) => this.projetoMapper.domainToModel(projeto)),
        })

        return model
    }

    modelToDomain(model: PerfilProfessorModel): PerfilProfessor {
        const domain = PerfilProfessor.criar(
            {
                descricao: model.descricao,
                link: model.link,
                areasAtuacao: model.areasAtuacao?.map((area) =>
                    this.areaAtuacaoMapper.modelToDomain(area),
                ),
                projetos: model.projetos?.map((projeto) =>
                    this.projetoMapper.modelToDomain(projeto),
                ),
            },
            model.id,
        )

        return domain
    }
}
