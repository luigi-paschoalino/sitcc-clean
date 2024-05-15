import { PerfilProfessorDTO } from './PerfilProfessor.dto'

export interface UsuarioDTO {
    id: string
    nome: string
    email: string
    curso: {
        id: string
        nome: string
        codigo: string
    }
    tipo: string
    numero: string
    matricula?: string
    perfilProfessor?: PerfilProfessorDTO
}
