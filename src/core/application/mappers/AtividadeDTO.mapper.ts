import { Atividade } from '../../domain/Atividades'
import { AtividadeDTO } from '../../domain/dtos/Atividade.dto'

export class AtividadeDTOMapper {
    toDTO(atividade: Atividade): AtividadeDTO {
        return {
            id: atividade.getId(),
            titulo: atividade.getTitulo(),
            descricao: atividade.getDescricao(),
            data: atividade.getData(),
        }
    }
}
