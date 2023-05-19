import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppDataSource } from '../ormconfig'

async function bootstrap() {
    AppDataSource.initialize()
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}
bootstrap()
