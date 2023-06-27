import { Atividade } from 'src/core/domain/Atividades'
import { AtividadeModel } from '../models/Atividade.model'

export class AtividadeMapper {
    constructor() {}

    public domainToModel(domain: Atividade): AtividadeModel {
        const model = AtividadeModel.create({
            id: domain.getId(),
            data: domain.getData(),
            titulo: domain.getTitulo(),
            descricao: domain.getDescricao(),
        })

        return model
    }

    public modelToDomain(model: AtividadeModel): Atividade {
        const domain = Atividade.criar(
            {
                data: model.data,
                descricao: model.descricao,
                titulo: model.titulo,
            },
            model.id,
        )

        return domain
    }
}
