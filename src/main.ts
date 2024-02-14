import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    config()
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'debug', 'verbose', 'log'],
    })
    app.enableCors()
    app.use(cookieParser())
    await app.listen(process.env.APP_PORT || 3000)

    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
