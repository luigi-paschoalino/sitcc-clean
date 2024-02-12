import { Atividade, TIPO_ATIVIDADE } from 'src/core/domain/Atividades'
import { Atividade as AtividadeModel } from '@prisma/client'

export class AtividadeMapper {
    constructor() {}

    public domainToModel(
        domain: Atividade,
        cronogramaId: string,
    ): AtividadeModel {
        return {
            id: domain.getId(),
            data: domain.getData(),
            descricao: domain.getDescricao(),
            titulo: domain.getTitulo(),
            cronogramaId,
        }
    }

    public modelToDomain(model: AtividadeModel): Atividade {
        const domain = Atividade.criar(
            {
                data: model.data,
                descricao: model.descricao,
                titulo: model.titulo as TIPO_ATIVIDADE,
            },
            model.id,
        )

        return domain
    }
}
