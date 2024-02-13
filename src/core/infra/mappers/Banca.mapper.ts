import { Prisma } from '@prisma/client'
import { Banca } from '../../domain/Banca'
import { BancaInfraDTO as BancaModel } from '../../../shared/infra/database/prisma/dtos/Banca.dto'

export class BancaMapper {
    constructor() {}

    domainToModel(domain: Banca, tccId: string): BancaModel {
        return {
            id: domain.getId(),
            data: domain.getDiaHora(),
            professorId: domain.getProfessorId(),
            segundoProfessorId: domain.getSegundoProfessorId(),
            notaApresentacao: new Prisma.Decimal(domain.getNotaApresentacao()),
            notaTrabalho: new Prisma.Decimal(domain.getNotaTrabalho()),
            tccId,
            versao: domain.getVersao(),
        }
    }

    modelToDomain(model: BancaModel): Banca {
        const domain = Banca.carregar(
            {
                professorId: model.professorId,
                segundoProfessorId: model.segundoProfessorId,
                data: model.data,
                notaApresentacao: Number(model.notaApresentacao),
                notaTrabalho: Number(model.notaTrabalho),
            },
            model.id,
        )

        return domain
    }
}
