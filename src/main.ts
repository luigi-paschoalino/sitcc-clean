import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppDataSource } from '../ormconfig'
import { config } from 'dotenv'

async function bootstrap() {
    config()
    AppDataSource.initialize()
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'debug', 'verbose', 'log'],
    })
    await app.listen(process.env.APP_PORT || 3000)

    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
