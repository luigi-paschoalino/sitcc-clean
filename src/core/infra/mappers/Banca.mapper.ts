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
            notaApresentacaoProfessor: domain.getNotaApresentacaoProfessor()
                ? new Prisma.Decimal(domain.getNotaApresentacaoProfessor())
                : undefined,
            notaApresentacaoSegundoProfessor:
                domain.getNotaApresentacaoSegundoProfessor()
                    ? new Prisma.Decimal(
                          domain.getNotaApresentacaoSegundoProfessor(),
                      )
                    : undefined,
            notaTrabalhoProfessor: domain.getNotaTrabalhoProfessor()
                ? new Prisma.Decimal(domain.getNotaTrabalhoProfessor())
                : undefined,
            notaTrabalhoSegundoProfessor:
                domain.getNotaTrabalhoSegundoProfessor()
                    ? new Prisma.Decimal(
                          domain.getNotaTrabalhoSegundoProfessor(),
                      )
                    : undefined,
            tccId,
        }
    }

    modelToDomain(model: BancaModel): Banca {
        const domain = Banca.carregar(
            {
                professorId: model.professorId,
                segundoProfessorId: model.segundoProfessorId,
                data: model.data,
                notaApresentacaoProfessor:
                    Number(model.notaApresentacaoProfessor) ?? null,
                notaApresentacaoSegundoProfessor:
                    Number(model.notaApresentacaoSegundoProfessor) ?? null,
                notaTrabalhoProfessor:
                    Number(model.notaTrabalhoProfessor) ?? null,
                notaTrabalhoSegundoProfessor:
                    Number(model.notaTrabalhoSegundoProfessor) ?? null,
            },
            model.id,
        )

        return domain
    }
}
