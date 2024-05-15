import { ProjetoDTO } from './Projeto.dto'

export interface PerfilProfessorDTO {
    id: string
    descricao: string
    link: string
    areasAtuacao: string[]
    projetos?: ProjetoDTO[]
}
