import { Norma } from '../../domain/Norma'
import { NormaModel } from '../models/Norma.model'

export class NormaMapper {
    constructor() {}

    public domainToModel(norma: Norma): NormaModel {
        const model = NormaModel.create({
            titulo: norma.getTitulo(),
            descricao: norma.getDescricao(),
            link: norma.getLink(),
            id: norma.getId(),
        })

        return model
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
