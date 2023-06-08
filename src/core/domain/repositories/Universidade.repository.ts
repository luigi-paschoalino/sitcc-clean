import { Universidade } from '../Universidade'

export interface UniversidadeRepository {
    buscarPorNome(nome: string): Promise<Error | Universidade>
    buscarPorId(id: string): Promise<Error | Universidade>
    buscarPorInstituto(institutoId: string): Promise<Error | Universidade>
    listarUniversidades(ids?: string[]): Promise<Error | Universidade[]>
    salvarUniversidade(universidade: Universidade): Promise<Error | void>
}
