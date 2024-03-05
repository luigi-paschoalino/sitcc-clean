import { Injectable } from '@nestjs/common'
import { Projeto } from '../../domain/Projeto'
import { Projeto as ProjetoModel } from '@prisma/client'

@Injectable()
export class ProjetoMapper {
    constructor() {}

    domainToModel(domain: Projeto, perfilProfessorId: string): ProjetoModel {
        return {
            id: domain.getId(),
            titulo: domain.getTitulo(),
            descricao: domain.getDescricao(),
            preRequisitos: domain.getPreRequisitos(),
            disponivel: domain.getDisponivel(),
            perfilProfessorId,
        }
    }

    modelToDomain(model: ProjetoModel): Error | Projeto {
        const domain = Projeto.carregar(
            {
                titulo: model.titulo,
                descricao: model.descricao,
                preRequisitos: model.preRequisitos,
                disponivel: model.disponivel,
            },
            model.id,
        )
        if (domain instanceof Error) throw domain

        return domain
    }
}
