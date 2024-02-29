import { PerfilProfessor } from './../../domain/PerfilProfessor'
import { AreasAtuacaoMapper } from './AreasAtuacao.mapper'
import { ProjetoMapper } from './Projeto.mapper'
import { PerfilProfessorInfraDTO as PerfilProfessorModel } from '../../../shared/infra/database/prisma/dtos/PerfilProfessor.dto'
import { AreasAtuacaoInfraDTO } from '../../../shared/infra/database/prisma/dtos/AreasAtuacao.dto'
export class PerfilProfessorMapper {
    constructor(
        private readonly projetoMapper: ProjetoMapper,
        private readonly areaAtuacaoMapper: AreasAtuacaoMapper,
    ) {}

    domainToModel(
        domain: PerfilProfessor,
        usuarioId: string,
    ): PerfilProfessorModel {
        const areasAtuacao = domain
            .getAreasAtuacao()
            ?.map((area) => this.areaAtuacaoMapper.domainToModel(area))

        return {
            id: domain.getId(),
            descricao: domain.getDescricao(),
            link: domain.getLink(),
            areasAtuacao,
            projetos: domain
                .getProjetos()
                ?.map((projeto) =>
                    this.projetoMapper.domainToModel(projeto, domain.getId()),
                ),
            usuarioId,
        }
    }

    modelToDomain(model: PerfilProfessorModel): PerfilProfessor {
        const domain = PerfilProfessor.criar({
            descricao: model.descricao,
            link: model.link,
            areasAtuacao: model.areasAtuacao?.map((area) =>
                this.areaAtuacaoMapper.modelToDomain(
                    area as unknown as AreasAtuacaoInfraDTO,
                ),
            ),
            projetos: model.projetos?.map((projeto) =>
                this.projetoMapper.modelToDomain(projeto),
            ),
        })

        return domain
    }
}
