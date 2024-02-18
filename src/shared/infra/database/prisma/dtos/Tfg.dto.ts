import { Tfg as PrismaTfg } from '@prisma/client'
import { BancaInfraDTO } from './Banca.dto'

export interface TfgInfraDTO extends PrismaTfg {
    banca: BancaInfraDTO[]
}
