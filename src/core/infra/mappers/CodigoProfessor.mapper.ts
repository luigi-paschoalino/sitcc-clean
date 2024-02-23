import { Injectable } from '@nestjs/common'
import { CodigoProfessor } from '../../domain/CodigoProfessor'
import { CodigoProfessor as CodigoProfessorModel } from '@prisma/client'

@Injectable()
export class CodigoProfessorMapper {
    constructor() {}

    domainToModel(domain: CodigoProfessor): CodigoProfessorModel {
        return {
            id: domain.getId(),
            codigo: domain.getCodigo(),
            disponivel: domain.getDisponivel(),
        }
    }

    modelToDomain(model: CodigoProfessorModel): CodigoProfessor {
        const domain = CodigoProfessor.criar({
            id: model.id,
            codigo: model.codigo,
        })

        return domain
    }
}
