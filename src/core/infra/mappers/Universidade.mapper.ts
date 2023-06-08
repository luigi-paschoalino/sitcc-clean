import { Injectable, Logger } from '@nestjs/common'
import { Universidade } from '../../domain/Universidade'
import { UniversidadeModel } from '../models/Universidade.model'
import { InstitutoMapper } from './Instituto.mapper'

@Injectable()
export class UniversidadeMapper {
    private logger = new Logger(UniversidadeMapper.name)

    constructor(private readonly institutoMapper: InstitutoMapper) {}

    public domainToModel(domain: Universidade): UniversidadeModel {
        const institutos = domain
            .getInstitutos()
            .map((instituto) => this.institutoMapper.domainToModel(instituto))

        const model = UniversidadeModel.create({
            id: domain.getId(),
            nome: domain.getNome(),
            institutos,
        })

        return model
    }

    //TODO: criar método carregar() dentro de Universidade.ts
    public modelToDomain(model: UniversidadeModel): Universidade {
        //TODO: recuperar institutos do banco de dados
        try {
            if (!model.institutos) model.institutos = []

            const institutos = model.institutos.map((instituto) =>
                this.institutoMapper.modelToDomain(instituto),
            )

            const domain = Universidade.carregar(
                {
                    nome: model.nome,
                    institutos,
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
