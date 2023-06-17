import { CadastrarUsuarioUseCase } from '../application/usecases/CadastrarUsuario.usecase'
import { Controller, Get, Body, Param, Post, Logger, Res, UseGuards } from '@nestjs/common'
import { CriarUsuarioProps } from '../domain/Usuario'
import { AbstractController } from './AbstractController'
import { BuscarUsuarioQuery } from '../application/queries/BuscarUsuario.query'
import { authenticationMiddleware } from 'src/presentation/middlewares/authenticationMiddleware' // Importe o middleware de autenticação

@Controller('usuarios')
export class UsuarioController extends AbstractController {
    private logger = new Logger(UsuarioController.name)
    constructor(
        private readonly cadastrarUsuarioUseCase: CadastrarUsuarioUseCase,
        private readonly buscarUsuarioQuery: BuscarUsuarioQuery,
    ) {
        super({
            UsuarioException: 400,
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
        })
    }

    @Get(':id')
    @UseGuards(authenticationMiddleware) // Aplicar o middleware de autenticação aqui
    async buscarUsuarioPorId(@Param('id') id: string) {
        const result = await this.buscarUsuarioQuery.execute(id)

        return this.handleResponse(result)
    }

    @Post()
    @UseGuards(authenticationMiddleware) // Aplicar o middleware de autenticação aqui
    async cadastrar(@Body() body: CriarUsuarioProps) {
        const result = await this.cadastrarUsuarioUseCase.execute(body)

        return this.handleResponse(result)
    }
}
