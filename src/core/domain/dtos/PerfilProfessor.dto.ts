import { ProjetoDTO } from './Projeto.dto'

export interface PerfilProfessorDTO {
    descricao: string
    link: string
    areasAtuacao: string[]
    projetos?: ProjetoDTO[]
}
