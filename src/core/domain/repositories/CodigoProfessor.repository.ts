import { CodigoProfessor } from './../CodigoProfessor'

export interface CodigoProfessorRepository {
    buscarCodigo(codigo: string): Promise<CodigoProfessor | Error>
    salvarCodigo(codigo: CodigoProfessor): Promise<Error | void>
}
