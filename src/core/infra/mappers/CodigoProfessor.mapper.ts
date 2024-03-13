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
            email: domain.getEmail(),
        }
    }

    modelToDomain(model: CodigoProfessorModel): CodigoProfessor {
        const domain = CodigoProfessor.carregar(
            {
                codigo: model.codigo,
                disponivel: model.disponivel,
                email: model.email,
            },
            model.id,
        )

        return domain
    }
}
