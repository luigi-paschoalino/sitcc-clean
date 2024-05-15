import { TfgDTO } from '../dtos/Tfg.dto'
import { Tfg } from '../Tfg'

export interface TfgFiltroProps {
    alunoId?: string
    orientadorId?: string
    bancaProfessorId?: string
}

export interface TfgRepository {
    buscarTfg(id: string): Promise<Error | Tfg>
    buscarTfgBFF(id: string): Promise<Error | TfgDTO>
    listarTfgs(
        apenasAtivos: boolean,
        filtro?: TfgFiltroProps,
    ): Promise<Error | Tfg[]>
    listarTfgsBFF(
        apenasAtivos: boolean,
        filtro?: TfgFiltroProps,
    ): Promise<Error | TfgDTO[]>
    salvarTfg(tfg: Tfg): Promise<Error | void>
}
