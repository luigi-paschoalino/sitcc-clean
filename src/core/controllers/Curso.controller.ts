import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Patch,
    Put,
    Req,
    Delete,
} from '@nestjs/common'
import {
    CadastrarCursoUsecase,
    CadastrarCursoUsecaseProps,
} from '../application/usecases/curso/CadastrarCurso.usecase'
import { AbstractController } from '../../shared/controllers/AbstractController'
import { ListarCursosQuery } from '../application/queries/ListarCursos.query'
import { BuscarCursoQuery } from '../application/queries/BuscarCurso.query'
import { JwtAuthGuard } from '../../shared/middlewares/AuthenticationMiddleware'
import {
    EditarCursoUsecase,
    EditarCursoUsecaseProps,
} from '../application/usecases/curso/EditarCurso.usecase'
import { CriarCronogramaProps } from '../domain/Cronograma'
import { AdicionarCronogramaUsecase } from '../application/usecases/curso/AdicionarCronograma.usecase'
import {
    AdicionarAtividadeCronogramaUsecase,
    AdicionarAtividadeCronogramaUsecaseProps,
} from '../application/usecases/curso/AdicionarAtividadeCronograma.usecase'
import {
    EditarAtividadeCronogramaUsecase,
    EditarAtividadeCronogramaUsecaseProps,
} from '../application/usecases/curso/EditarAtividadeCronograma.usecase'
import { RemoverAtividadeCronogramaUsecase } from '../application/usecases/curso/RemoverAtividadeCronograma.usecase'
import {
    AtualizarNormaUsecase,
    AtualizarNormaUsecaseProps,
} from '../application/usecases/curso/AtualizarNorma.usecase'

@Controller('cursos')
export class CursoController extends AbstractController {
    constructor(
        private readonly buscarCursoQuery: BuscarCursoQuery,
        private readonly listarCursosQuery: ListarCursosQuery,
        private readonly cadastrarCursoUsecase: CadastrarCursoUsecase,
        private readonly editarCursoUsecase: EditarCursoUsecase,
        private readonly adicionarCronogramaUsecase: AdicionarCronogramaUsecase,
        private readonly adicionarAtividadeCronogramaUsecase: AdicionarAtividadeCronogramaUsecase,
        private readonly editarAtividadeCronogramaUsecase: EditarAtividadeCronogramaUsecase,
        private readonly removerAtividadeCronogramaUsecase: RemoverAtividadeCronogramaUsecase,
        private readonly atualizarNormaUsecase: AtualizarNormaUsecase,
    ) {
        super({
            RepositoryException: 500,
            CursoException: 400,
            InvalidPropsException: 400,
            RepositoryDataNotFoundException: 404,
            UsuarioException: 401,
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async listCursos() {
        const result = await this.listarCursosQuery.execute()

        return this.handleResponse(result)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getCurso(@Param('id') id: string) {
        const result = await this.buscarCursoQuery.execute({
            id,
        })

        return this.handleResponse(result)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    public async cadastrarCurso(@Body() body: CadastrarCursoUsecaseProps) {
        const result = await this.cadastrarCursoUsecase.execute(body)

        return this.handleResponse(result)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    public async editarCurso(
        @Param('id') id: string,
        @Body() body: EditarCursoUsecaseProps,
    ) {
        const result = await this.editarCursoUsecase.execute({
            id,
            ...body,
        })

        return this.handleResponse(result)
    }

    // Adição de cronogramas
    @Put(':id/cronograma')
    @UseGuards(JwtAuthGuard)
    public async adicionarCronograma(
        @Param('id') id: string,
        @Body() props: CriarCronogramaProps,
        @Req() req: any,
    ) {
        const result = await this.adicionarCronogramaUsecase.execute({
            cursoId: id,
            ano: props.ano,
            semestre: props.semestre,
            usuarioTipo: req.user.tipo,
        })

        return this.handleResponse(result)
    }

    // Atividades do cronograma
    @Put(':id/cronograma/:cronogramaId/atividade')
    @UseGuards(JwtAuthGuard)
    public async adicionarAtividadeCronograma(
        @Param('id') id: string,
        @Param('cronogramaId') cronogramaId: string,
        @Body() props: AdicionarAtividadeCronogramaUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.adicionarAtividadeCronogramaUsecase.execute({
            cursoId: id,
            cronogramaId,
            usuarioTipo: req.user.tipo,
            ...props,
        })

        return this.handleResponse(result)
    }

    @Patch(':id/cronograma/:cronogramaId/atividade/:atividadeId')
    @UseGuards(JwtAuthGuard)
    public async editarAtividadeCronograma(
        @Param('id') id: string,
        @Param('cronogramaId') cronogramaId: string,
        @Param('atividadeId') atividadeId: string,
        @Body() props: EditarAtividadeCronogramaUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.editarAtividadeCronogramaUsecase.execute({
            cursoId: id,
            cronogramaId,
            atividadeId,
            usuarioTipo: req.user.tipo,
            ...props,
        })

        return this.handleResponse(result)
    }

    @Delete(':id/cronograma/:cronogramaId/atividade/:atividadeId')
    @UseGuards(JwtAuthGuard)
    public async removerAtividadeCronograma(
        @Param('id') id: string,
        @Param('cronogramaId') cronogramaId: string,
        @Param('atividadeId') atividadeId: string,
        @Req() req: any,
    ) {
        const result = await this.removerAtividadeCronogramaUsecase.execute({
            cursoId: id,
            cronogramaId,
            atividadeId,
            usuarioTipo: req.user.tipo,
        })

        return this.handleResponse(result)
    }

    // Norma
    @Put(':id/norma')
    @UseGuards(JwtAuthGuard)
    public async atualizarNorma(
        @Param('id') id: string,
        @Body() body: AtualizarNormaUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.atualizarNormaUsecase.execute({
            ...body,
            id,
            tipoUsuario: req.user.tipo,
        })

        return this.handleResponse(result)
    }
}
