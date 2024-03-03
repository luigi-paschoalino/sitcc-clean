import { SEMESTRE } from '../Cronograma'
import { AtividadeDTO } from './Atividade.dto'

export interface CronogramaDTO {
    id: string
    ano: number
    semestre: SEMESTRE
    atividades?: AtividadeDTO[]
}
