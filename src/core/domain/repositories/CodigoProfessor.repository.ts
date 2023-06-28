import { CodigoProfessor } from './../CodigoProfessor'

// TODO: criar implementação
export interface CodigoProfessorRepository {
    buscarCodigo(codigo: string): Promise<CodigoProfessor | Error>
    consumirCodigo(codigo: string): Promise<Error | void>
    salvarCodigo(codigo: CodigoProfessor): Promise<Error | void>
}
