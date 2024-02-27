import { CarregarIndicadorProps } from '../Indicador'

export interface ListarTfgService {
    execute(): Promise<Error | CarregarIndicadorProps>
}
