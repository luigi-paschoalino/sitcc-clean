import { Injectable } from '@nestjs/common'
import { Universidade } from '../../domain/Universidade'
import { UniversidadeModel } from '../models/Universidade.model'

@Injectable()
export class UniversidadeMapper {
    constructor() {}

    public domainToModel(domain: Universidade): UniversidadeModel {
        const model = UniversidadeModel.create({
            id: domain.getId(),
            nome: domain.getNome(),
        })

        return model
    }

    public modelToDomain(model: UniversidadeModel): Universidade {
        try {
            const domain = Universidade.criar(
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
