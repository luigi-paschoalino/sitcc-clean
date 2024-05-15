import { Curso } from '../Curso'

export interface CursoRepository {
    buscarPorNome(nome: string): Promise<Error | Curso>
    buscarPorId(id: string): Promise<Error | Curso>
    buscarPorCodigo(codigo: string): Promise<Error | Curso>
    listarCursos(ids?: string[]): Promise<Error | Curso[]>
    salvarCurso(curso: Curso): Promise<Error | void>
}
