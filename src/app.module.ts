import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { IndicadorModule } from './indicador/indicador.module'

@Module({
    imports: [CoreModule, IndicadorModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
