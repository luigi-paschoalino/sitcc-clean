import { AreasAtuacao } from '../../domain/AreasAtuacao'
import { AreasAtuacaoInfraDTO as AreasAtuacaoModel } from '../../../shared/infra/database/prisma/dtos/AreasAtuacao.dto'
import { JsonValue } from '@prisma/client/runtime/library'

export class AreasAtuacaoMapper {
    constructor() {}

    domainToModel(domain: AreasAtuacao): JsonValue {
        return {
            titulo: domain.getTitulo(),
            descricao: domain.getDescricao(),
        }
    }

    modelToDomain(model: AreasAtuacaoModel): AreasAtuacao {
        const domain = AreasAtuacao.criar({
            titulo: model.titulo,
            descricao: model.descricao,
        })

        return domain
    }
}
