import { Norma } from '../../domain/Norma'
import { NormaDTO } from '../../domain/dtos/Norma.dto'

export class NormaDTOMapper {
    toDTO(norma: Norma): NormaDTO {
        return {
            id: norma.getId(),
            titulo: norma.getTitulo(),
            descricao: norma.getDescricao(),
            link: norma.getLink(),
            dataPublicacao: norma.getDataPublicacao(),
        }
    }
}
