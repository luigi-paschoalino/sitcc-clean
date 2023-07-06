import { Controller, Post, Body, Delete } from '@nestjs/common'
import {
    AutenticarUsecase,
    AutenticarUsecaseProps,
} from '../application/usecases/Autenticar.usecase'
import { AbstractController } from './AbstractController'
import { Response } from 'express'

@Controller('login')
export class AuthController extends AbstractController {
    constructor(private readonly autenticarUsecase: AutenticarUsecase) {
        super({
            UsuarioException: 400,
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
        })
    }

    @Post()
    async login(@Body() body: AutenticarUsecaseProps) {
        const result = await this.autenticarUsecase.logar(body)

        return super.handleResponse(result)
    }

    @Delete()
    async logout(res: Response) {
        res.setHeader('Authorization', '')
        res.status(200).send()
    }
}
