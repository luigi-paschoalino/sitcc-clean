import { Curso as PrismaCurso, Norma as PrismaNorma } from '@prisma/client'
import { CronogramaInfraDTO } from './Cronograma.dto'

export interface CursoInfraDTO extends PrismaCurso {
    normas?: PrismaNorma[]
    cronogramas?: CronogramaInfraDTO[]
}
