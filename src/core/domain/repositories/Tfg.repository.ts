import { Tfg } from '../Tfg'

export interface TfgRepository {
    buscarTfg(id: string): Promise<Error | Tfg>
    salvarTfg(tfg: Tfg): Promise<Error | void>
}
