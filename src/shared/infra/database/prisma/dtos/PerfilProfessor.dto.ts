import {
    PerfilProfessor as PrismaPerfilProfessor,
    Projeto as PrismaProjeto,
} from '@prisma/client'

export interface PerfilProfessorInfraDTO extends PrismaPerfilProfessor {
    projetos?: PrismaProjeto[]
}
