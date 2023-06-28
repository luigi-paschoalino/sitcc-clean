import { Controller, Post, Body } from '@nestjs/common'
import { AutenticarUsecase } from '../application/usecases/Autenticar.usecase'
import { AbstractController } from './AbstractController'

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
    async login(@Body() body) {
        const result = await this.autenticarUsecase.logar(body)
        return super.handleResponse(result)
    }
}
