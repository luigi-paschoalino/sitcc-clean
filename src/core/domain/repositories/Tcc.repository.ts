import { Tfg } from '../Tfg'

export interface TccRepository {
    buscarTcc(id: string): Promise<Error | Tfg>
    salvarTcc(tcc: Tfg): Promise<Error | void>
}
