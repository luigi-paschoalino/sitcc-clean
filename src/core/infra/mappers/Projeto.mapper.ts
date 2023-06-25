import { Injectable } from '@nestjs/common'
import { ProjetoModel } from '../models/Projeto.model'
import { Projeto } from '../../domain/Projeto'

@Injectable()
export class ProjetoMapper {
    constructor() {}

    domainToModel(projeto: Projeto): ProjetoModel {
        const model = ProjetoModel.create({
            titulo: projeto.getTitulo(),
            descricao: projeto.getDescricao(),
            preRequisitos: projeto.getPreRequisitos(),
            disponivel: projeto.getDisponivel(),
        })

        return model
    }

    modelToDomain(projetoModel: ProjetoModel): Projeto {
        const domain = Projeto.criar(
            {
                titulo: projetoModel.titulo,
                descricao: projetoModel.descricao,
                preRequisitos: projetoModel.preRequisitos,
                disponivel: projetoModel.disponivel,
            },
            projetoModel.id,
        )

        return domain
    }
}
