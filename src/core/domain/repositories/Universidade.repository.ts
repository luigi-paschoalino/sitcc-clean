import { Curso } from '../Curso'
import { Universidade } from '../Universidade'

export interface UniversidadeRepository {
    buscarPorNome(nome: string): Promise<Error | Universidade>
    buscarPorId(id: string): Promise<Error | Universidade>
    buscarPorInstitutoId(institutoId: string): Promise<Error | Universidade>
    buscarPorCursoId(cursoId: string): Promise<Error | Universidade>
    buscarCurso(cursoId: string): Promise<Error | Curso>
    listarUniversidades(ids?: string[]): Promise<Error | Universidade[]>
    salvarUniversidade(universidade: Universidade): Promise<Error | void>
}
