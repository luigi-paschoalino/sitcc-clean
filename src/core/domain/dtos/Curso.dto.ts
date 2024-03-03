import { CronogramaDTO } from './Cronograma.dto'
import { NormaDTO } from './Norma.dto'

export interface CursoDTO {
    id: string
    nome: string
    codigo: string
    cronogramas: CronogramaDTO[]
    normas: NormaDTO[]
}
