import { Tcc } from '../Tcc'

export interface TccRepository {
    buscarTcc(id: string): Promise<Error | Tcc>
    salvarTcc(tcc: Tcc): Promise<Error | void>
}
