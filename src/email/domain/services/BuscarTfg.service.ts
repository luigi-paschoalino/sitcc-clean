import { Tfg } from '../Tfg'

export interface BuscarTfgService {
    buscar(id: string): Promise<Error | Tfg>
}
