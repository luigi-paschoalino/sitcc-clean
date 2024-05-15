import { Projeto } from '../../domain/Projeto'
import { ProjetoDTO } from '../../domain/dtos/Projeto.dto'

export class ProjetoDTOMapper {
    toDTO(projeto: Projeto): ProjetoDTO {
        return {
            id: projeto.getId(),
            descricao: projeto.getDescricao(),
            disponivel: projeto.getDisponivel(),
            preRequisitos: projeto.getPreRequisitos(),
            titulo: projeto.getTitulo(),
        }
    }
}
