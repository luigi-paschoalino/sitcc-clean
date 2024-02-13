import {
    PerfilProfessor as PrismaPerfilProfessor,
    Projeto,
} from '@prisma/client'

export interface PerfilProfessorInfraDTO extends PrismaPerfilProfessor {
    projetos: Projeto[]
}
