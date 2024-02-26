import { Controller, Post, Body, Delete } from '@nestjs/common'
import {
    AutenticarUsecase,
    AutenticarUsecaseProps,
} from '../application/usecases/auth/Autenticar.usecase'
import { AbstractController } from '../../shared/controllers/AbstractController'
import { Response } from 'express'
import {
    ValidarTokenUsecase,
    ValidarTokenUsecaseProps,
} from '../application/usecases/auth/ValidarToken.usecase'

@Controller('login')
export class AuthController extends AbstractController {
    constructor(
        private readonly autenticarUsecase: AutenticarUsecase,
        private readonly validarTokenUsecase: ValidarTokenUsecase,
    ) {
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

    @Post('validate')
    async validateToken(@Body() body: ValidarTokenUsecaseProps) {
        const result = await this.validarTokenUsecase.execute(body)

        return super.handleResponse(result)
    }
}
