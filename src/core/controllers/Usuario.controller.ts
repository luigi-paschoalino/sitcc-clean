import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/shared/middlewares/AuthenticationMiddleware'
import { AbstractController } from '../../shared/controllers/AbstractController'
import { BuscarUsuarioQuery } from '../application/queries/BuscarUsuario.query'
import { BuscarUsuarioHashQuery } from '../application/queries/BuscarUsuarioHash.query'
import { ListarProfessoresQuery } from '../application/queries/ListarProfessores.query'
import {
    AlterarSenhaUsecase,
    AlterarSenhaUsecaseProps,
} from '../application/usecases/usuario/AlterarSenha.usecase'
import {
    CadastrarUsuarioUseCase,
    CadastrarUsuarioUsecaseProps,
} from '../application/usecases/usuario/CadastrarUsuario.usecase'
import {
    RecuperarSenhaUsecase,
    RecuperarSenhaUsecaseProps,
} from '../application/usecases/usuario/RecuperarSenha.usecase'
import {
    AtualizarPerfilProfessorUsecase,
    AtualizarPerfilProfessorUsecaseProps,
} from '../application/usecases/usuario/AtualizarPerfilProfessor.usecase'
import {
    AdicionarProjetoUsecase,
    AdicionarProjetoUsecaseProps,
} from '../application/usecases/usuario/AdicionarProjeto.usecase'
import {
    EditarProjetoUsecase,
    EditarProjetoUsecaseProps,
} from '../application/usecases/usuario/EditarProjeto.usecase'
import { ExcluirProjetoUsecase } from '../application/usecases/usuario/ExcluirProjeto.usecase'

@Controller('usuarios')
export class UsuarioController extends AbstractController {
    constructor(
        private readonly cadastrarUsuarioUsecase: CadastrarUsuarioUseCase,
        private readonly buscarUsuarioQuery: BuscarUsuarioQuery,
        private readonly recuperarSenhaUsecase: RecuperarSenhaUsecase,
        private readonly alterarSenhaUsecase: AlterarSenhaUsecase,
        private readonly listarProfessores: ListarProfessoresQuery,
        private readonly buscarUsuarioHashQuery: BuscarUsuarioHashQuery,
        private readonly atualizarPerfilProfessorUsecase: AtualizarPerfilProfessorUsecase,
        private readonly adicionarProjetoUsecase: AdicionarProjetoUsecase,
        private readonly editarProjetoUsecase: EditarProjetoUsecase,
        private readonly excluirProjetoUsecase: ExcluirProjetoUsecase,
    ) {
        super({
            UsuarioException: 401,
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

    // Professor

    // Usecase para editar o perfil professor
    @Patch('perfil-professor')
    @UseGuards(JwtAuthGuard)
    async atualizarPerfilProfessor(
        @Body() body: AtualizarPerfilProfessorUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.atualizarPerfilProfessorUsecase.execute({
            ...body,
            usuarioId: req.user.id,
        })

        return this.handleResponse(result)
    }

    @Put('perfil-professor/projetos')
    @UseGuards(JwtAuthGuard)
    async adicionarProjeto(
        @Body() body: AdicionarProjetoUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.adicionarProjetoUsecase.execute({
            ...body,
            usuarioId: req.user.id,
        })

        return this.handleResponse(result)
    }

    @Patch('perfil-professor/projetos/:id')
    @UseGuards(JwtAuthGuard)
    async editarProjeto(
        @Param('id') id: string,
        @Body() body: EditarProjetoUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.editarProjetoUsecase.execute({
            ...body,
            usuarioId: req.user.id,
            projetoId: id,
        })

        return this.handleResponse(result)
    }

    @Delete('perfil-professor/projetos/:id')
    @UseGuards(JwtAuthGuard)
    async excluirProjeto(@Param('id') id: string, @Req() req: any) {
        const result = await this.excluirProjetoUsecase.execute({
            usuarioId: req.user.id,
            projetoId: id,
        })

        return this.handleResponse(result)
    }
}
