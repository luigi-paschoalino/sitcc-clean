import { CodigoProfessor } from './../CodigoProfessor'

export interface CodigoProfessorRepository {
    buscarCodigo(codigo: string): Promise<CodigoProfessor | Error>
    listarCodigos(): Promise<Error | CodigoProfessor[]>
    salvarCodigo(codigo: CodigoProfessor): Promise<Error | void>
}
