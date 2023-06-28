import {
    CadastrarUsuarioUseCase,
    CadastrarUsuarioUsecaseProps,
} from '../application/usecases/CadastrarUsuario.usecase'
import { Controller, Get, Body, Param, Post, Res } from '@nestjs/common'
import { AbstractController } from './AbstractController'
import { BuscarUsuarioQuery } from '../application/queries/BuscarUsuario.query'

@Controller('usuarios')
export class UsuarioController extends AbstractController {
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
    async buscarUsuarioPorId(@Param('id') id: string) {
        const result = await this.buscarUsuarioQuery.execute(id)

        return this.handleResponse(result)
    }

    @Post()
    async cadastrar(@Body() body: CadastrarUsuarioUsecaseProps) {
        const result = await this.cadastrarUsuarioUseCase.execute(body)

        return this.handleResponse(result)
    }
}
