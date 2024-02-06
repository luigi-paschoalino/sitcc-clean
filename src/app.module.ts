import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { DatabaseModule } from './database.module'
import { DatabaseModule } from './shared/infra/database/database.module';

@Module({
    imports: [CoreModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
