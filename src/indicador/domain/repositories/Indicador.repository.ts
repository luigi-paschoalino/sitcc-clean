import { Indicador } from '../Indicador'

export interface IndicadorRepository {
    buscar(): Promise<Error | Indicador>
    salvar(indicador: Indicador): Promise<Error | void>
}
