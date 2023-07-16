import { Injectable } from '@nestjs/common'
import { CodigoProfessor } from '../../domain/CodigoProfessor'
import { CodigoProfessorModel } from '../models/CodigoProfessor.model'

@Injectable()
export class CodigoProfessorMapper {
    constructor() {}

    domainToModel(domain: CodigoProfessor): CodigoProfessorModel {
        const model = CodigoProfessorModel.create({
            id: domain.getId(),
            codigo: domain.getCodigo(),
            disponivel: domain.getDisponivel(),
        })

        return model
    }

    modelToDomain(model: CodigoProfessorModel): CodigoProfessor {
        const domain = CodigoProfessor.gerar(model.codigo, model.id)

        return domain
    }
}
