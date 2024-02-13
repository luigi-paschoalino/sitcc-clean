import {
    Atividade as PrismaAtividade,
    Cronograma as PrismaCronograma,
} from '@prisma/client'

export interface CronogramaInfraDTO extends PrismaCronograma {
    atividades?: PrismaAtividade[]
}
