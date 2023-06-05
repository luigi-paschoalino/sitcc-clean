import { Instituto } from '../../domain/Instituto'
import { InstitutoModel } from './../models/Instituto.model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InstitutoMapper {
    constructor() {}

    public domainToModel(domain: Instituto): InstitutoModel {
        const model = InstitutoModel.create({
            id: domain.getId(),
            nome: domain.getNome(),
        })

        return model
    }

    public modelToDomain(model: InstitutoModel): Instituto {
        try {
            const domain = Instituto.criar(
                {
                    nome: model.nome,
                },
                model.id,
            )

            if (domain instanceof Error) throw domain

            return domain
        } catch (error) {
            return error
        }
    }
}
