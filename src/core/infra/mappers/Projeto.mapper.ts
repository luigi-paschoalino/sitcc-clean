import { Injectable } from '@nestjs/common'
import { Projeto } from '../../domain/Projeto'
import { Projeto as ProjetoModel } from '@prisma/client'

@Injectable()
export class ProjetoMapper {
    constructor() {}

    domainToModel(projeto: Projeto, perfilProfessorId: string): ProjetoModel {
        return {
            id: projeto.getId(),
            titulo: projeto.getTitulo(),
            descricao: projeto.getDescricao(),
            preRequisitos: projeto.getPreRequisitos(),
            disponivel: projeto.getDisponivel(),
            perfilProfessorId,
        }
    }

    modelToDomain(projetoModel: ProjetoModel): Error | Projeto {
        const domain = Projeto.criar({
            titulo: projetoModel.titulo,
            descricao: projetoModel.descricao,
            preRequisitos: projetoModel.preRequisitos,
            disponivel: projetoModel.disponivel,
        })
        if (domain instanceof Error) throw domain

        return domain
    }
}
