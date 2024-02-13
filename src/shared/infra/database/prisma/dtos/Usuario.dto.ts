import { Usuario as PrismaUsuario } from '@prisma/client'
import { PerfilProfessorInfraDTO } from './PerfilProfessor.dto'

export interface UsuarioInfraDTO extends PrismaUsuario {
    perfilProfessor: PerfilProfessorInfraDTO
}
