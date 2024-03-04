import { PerfilProfessor } from './../../domain/PerfilProfessor'
import { ProjetoMapper } from './Projeto.mapper'
import { PerfilProfessorInfraDTO as PerfilProfessorModel } from '../../../shared/infra/database/prisma/dtos/PerfilProfessor.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PerfilProfessorMapper {
    constructor(private readonly projetoMapper: ProjetoMapper) {}

    domainToModel(
        domain: PerfilProfessor,
        usuarioId: string,
    ): PerfilProfessorModel {
        const projetos = domain
            .getProjetos()
            ?.map((projeto) =>
                this.projetoMapper.domainToModel(projeto, domain.getId()),
            )

        return {
            id: domain.getId(),
            descricao: domain.getDescricao(),
            areasAtuacao: domain.getAreasAtuacao(),
            link: domain.getLink(),
            projetos,
            usuarioId,
        }
    }

    modelToDomain(model: PerfilProfessorModel): PerfilProfessor {
        const domain = PerfilProfessor.criar(
            {
                descricao: model.descricao,
                link: model.link,
                areasAtuacao: model.areasAtuacao,
                projetos: model.projetos?.map((projeto) =>
                    this.projetoMapper.modelToDomain(projeto),
                ),
            },
            model.id,
        )

        return domain
    }
}
