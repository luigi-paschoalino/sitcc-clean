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

    public modelToDomain(model: AtividadeModel): Error | Atividade {
        const domain = Atividade.carregar(
            {
                data: model.data,
                descricao: model.descricao,
                titulo: model.titulo as TIPO_ATIVIDADE,
            },
            model.id,
        )
        if (domain instanceof Error) return domain

        return domain
    }

    public modelToDomainList(modelList: AtividadeModel[]): Error | Atividade[] {
        try {
            const domain = modelList.map((atividade) => {
                const atividadeDomain = this.modelToDomain(atividade)
                if (atividadeDomain instanceof Error) throw atividadeDomain
                return atividadeDomain
            })

            return domain
        } catch (error) {
            return error
        }
    }

    public domainToModelList(
        domainList: Atividade[],
        cronogramaId: string,
    ): AtividadeModel[] {
        return domainList.map((atividade) => {
            return {
                id: atividade.getId(),
                data: atividade.getData(),
                descricao: atividade.getDescricao(),
                titulo: atividade.getTitulo(),
                cronogramaId,
            }
        })
    }
}
