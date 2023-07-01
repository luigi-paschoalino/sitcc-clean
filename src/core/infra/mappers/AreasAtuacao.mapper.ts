import { AreasAtuacao } from '../../domain/AreasAtuacao'
import { AreasAtuacaoModel } from '../models/AreasAtuacao.model'

export class AreasAtuacaoMapper {
    constructor() {}

    domainToModel(domain: AreasAtuacao): AreasAtuacaoModel {
        const model = new AreasAtuacaoModel()

        model.setProps({
            titulo: domain.getTitulo(),
            descricao: domain.getDescricao(),
        })

        return model
    }

    modelToDomain(model: AreasAtuacaoModel): AreasAtuacao {
        const domain = AreasAtuacao.criar({
            titulo: model.titulo,
            descricao: model.descricao,
        })

        return domain
    }
}
