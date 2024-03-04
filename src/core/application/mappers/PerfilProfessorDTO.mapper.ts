import { Injectable } from '@nestjs/common'
import { PerfilProfessor } from '../../domain/PerfilProfessor'
import { PerfilProfessorDTO } from '../../domain/dtos/PerfilProfessor.dto'
import { ProjetoDTOMapper } from './ProjetoDTO.mapper'

@Injectable()
export class PerfilProfessorDTOMapper {
    constructor(private readonly projetoDTOMapper: ProjetoDTOMapper) {}

    toDTO(perfilProfessor: PerfilProfessor): PerfilProfessorDTO {
        return {
            areasAtuacao: perfilProfessor.getAreasAtuacao(),
            descricao: perfilProfessor.getDescricao(),
            link: perfilProfessor.getLink(),
            projetos:
                perfilProfessor.getProjetos()?.map((p) => {
                    return this.projetoDTOMapper.toDTO(p)
                }) ?? [],
        }
    }
}
