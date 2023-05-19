import { Module } from '@nestjs/common'
import { DatabaseProviders } from '../ormconfig'

@Module({
    providers: [...DatabaseProviders],
    exports: [...DatabaseProviders],
})
export class DatabaseModule {}
