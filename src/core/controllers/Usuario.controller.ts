import {
    CadastrarUsuarioUseCase,
    CadastrarUsuarioUsecaseProps,
} from '../application/usecases/CadastrarUsuario.usecase'
import {
    Controller,
    Get,
    Body,
    Param,
    Post,
    UseGuards,
    Patch,
} from '@nestjs/common'
import { AbstractController } from './AbstractController'
import { BuscarUsuarioQuery } from '../application/queries/BuscarUsuario.query'
import {
    RecuperarSenhaUsecase,
    RecuperarSenhaUsecaseProps,
} from '../application/usecases/RecuperarSenha.usecase'
import {
    AlterarSenhaUsecase,
    AlterarSenhaUsecaseProps,
} from '../application/usecases/AlterarSenha.usecase'
import { JwtAuthGuard } from 'src/middlewares/AuthenticationMiddleware'

@Controller('usuarios')
export class UsuarioController extends AbstractController {
    constructor(
        private readonly cadastrarUsuarioUsecase: CadastrarUsuarioUseCase,
        private readonly buscarUsuarioQuery: BuscarUsuarioQuery,
        private readonly recuperarSenhaUsecase: RecuperarSenhaUsecase,
        private readonly alterarSenhaUsecase: AlterarSenhaUsecase,
    ) {
        super({
            UsuarioException: 400,
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
        })
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async buscarUsuarioPorId(@Param('id') id: string) {
        const result = await this.buscarUsuarioQuery.execute(id)

        return this.handleResponse(result)
    }

    @Post()
    async cadastrar(@Body() body: CadastrarUsuarioUsecaseProps) {
        const result = await this.cadastrarUsuarioUsecase.execute(body)

        return this.handleResponse(result)
    }

    @Patch('recuperar')
    async recuperarSenha(@Body() body: RecuperarSenhaUsecaseProps) {
        const result = await this.recuperarSenhaUsecase.execute(body)

        return this.handleResponse(result)
    }

    @Patch('alterar-senha/:id')
    async alterarSenha(
        @Param('id') id: string,
        @Body() body: AlterarSenhaUsecaseProps,
    ) {
        const result = await this.alterarSenhaUsecase.execute({
            ...body,
            id,
        })

        return this.handleResponse(result)
    }
}
