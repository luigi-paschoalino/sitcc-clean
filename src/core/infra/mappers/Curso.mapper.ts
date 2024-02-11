import { Curso } from '../../domain/Curso'
import { Curso as PrismaCurso } from '@prisma/client'

export class CursoMapper {
    constructor() {}

    domainToModel(domain: Curso): PrismaCurso {
        return {
            id: domain.getId(),
            nome: domain.getNome(),
            codigo: domain.getCodigo(),
        }
    }

    modelToDomain(model: PrismaCurso): Curso {
        const domain = Curso.carregar(
            {
                nome: model.nome,
                codigo: model.codigo,
            },
            model.id,
        )
        return domain
    }
}
