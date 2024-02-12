import { Norma } from '../../domain/Norma'
import { Norma as NormaModel } from '@prisma/client'

export class NormaMapper {
    constructor() {}

    public domainToModel(norma: Norma, cursoId: string): NormaModel {
        return {
            id: norma.getId(),
            descricao: norma.getDescricao(),
            link: norma.getLink(),
            titulo: norma.getTitulo(),
            cursoId,
        }
    }

    public modelToDomain(norma: NormaModel): Norma {
        const domain = Norma.criar(
            {
                titulo: norma.titulo,
                descricao: norma.descricao,
                link: norma.link,
            },
            norma.id,
        )

        return domain
    }
}
