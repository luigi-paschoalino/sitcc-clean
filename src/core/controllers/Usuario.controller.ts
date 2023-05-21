import { CadastrarUsuarioUseCase } from '../application/usecases/CadastrarUsuario.usecase'
import { Controller, Get, Body, Param, Post, Logger, Res } from '@nestjs/common'
import { CriarUsuarioProps } from '../domain/Usuario'
import { AbstractController } from './AbstractController'
import { BuscarUsuarioQuery } from '../application/queries/BuscarUsuario.query'

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
        })
    }

    @Get(':id')
    async buscarUsuarioPorId(@Param('id') id: string) {
        const result = await this.buscarUsuarioQuery.execute(id)

        return this.handleResponse(result)
    }

    @Post()
    async cadastrar(@Body() body: CriarUsuarioProps) {
        const result = await this.cadastrarUsuarioUseCase.execute(body)

        return this.handleResponse(result)
    }
}
