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
import { ListarProfessoresQuery } from '../application/queries/ListarProfessores.query'
import { BuscarUsuarioHashQuery } from '../application/queries/BuscarUsuarioHash.query'

@Controller('usuarios')
export class UsuarioController extends AbstractController {
    constructor(
        private readonly cadastrarUsuarioUsecase: CadastrarUsuarioUseCase,
        private readonly buscarUsuarioQuery: BuscarUsuarioQuery,
        private readonly recuperarSenhaUsecase: RecuperarSenhaUsecase,
        private readonly alterarSenhaUsecase: AlterarSenhaUsecase,
        private readonly listarProfessores: ListarProfessoresQuery,
        private readonly buscarUsuarioHashQuery: BuscarUsuarioHashQuery,
    ) {
        super({
            UsuarioException: 400,
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
        })
    }

    @Get('professores')
    @UseGuards(JwtAuthGuard)
    async listProfs() {
        const result = await this.listarProfessores.execute()

        return this.handleResponse(result)
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

    @Get('recuperar/:hash')
    async buscarUsuarioPorHashSenha(@Param('hash') hash: string) {
        const result = await this.buscarUsuarioHashQuery.execute(hash)

        return this.handleResponse(result)
    }

    @Patch('alterar-senha/:hash')
    async alterarSenha(
        @Param('hash') hash: string,
        @Body() body: AlterarSenhaUsecaseProps,
    ) {
        const result = await this.alterarSenhaUsecase.execute({
            ...body,
            hashRecuperacaoSenha: hash,
        })

        return this.handleResponse(result)
    }
}
