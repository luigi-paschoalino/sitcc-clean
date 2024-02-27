import { Module } from '@nestjs/common'
import { IndicadorController } from './controllers/Indicador.controller'
import { AtualizarIndicadorHandler } from './application/handlers/AtualizarIndicador.handler'
import { IndicadorMapper } from './infra/mappers/Indicador.mapper'
import { IndicadorRepositoryImpl } from './infra/repositories/Indicador.repository'
import { BuscarIndicadorQuery } from './application/queries/BuscarIndicador.query'
import { PrismaService } from '../shared/infra/database/prisma/prisma.service'
import { ListarTfgServiceImpl } from './infra/services/ListarTfg.service'

@Module({
    imports: [],
    controllers: [IndicadorController],
    providers: [
        AtualizarIndicadorHandler,
        IndicadorMapper,
        BuscarIndicadorQuery,
        {
            provide: 'IndicadorRepository',
            useClass: IndicadorRepositoryImpl,
        },
        {
            provide: 'ListarTfgService',
            useClass: ListarTfgServiceImpl,
        },
        {
            provide: 'PrismaService',
            useClass: PrismaService,
        },
    ],
})
export class IndicadorModule {}
