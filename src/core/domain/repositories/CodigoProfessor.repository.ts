import { CodigoProfessor } from './../CodigoProfessor'

// TODO: criar implementação
export interface CodigoProfessorRepository {
    buscarCodigo(codigo: string): Promise<CodigoProfessor | Error>
    salvarCodigo(codigo: CodigoProfessor): Promise<Error | void>
}
