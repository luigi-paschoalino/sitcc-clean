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

@Controller('cursos')
export class CursoController extends AbstractController {
    constructor(
        private readonly buscarCursoQuery: BuscarCursoQuery,
        private readonly listarCursosQuery: ListarCursosQuery,
        private readonly cadastrarCursoUsecase: CadastrarCursoUsecase,
        private readonly editarCursoUsecase: EditarCursoUsecase,
        private readonly adicionarCronogramaUsecase: AdicionarCronogramaUsecase,
    ) {
        super({
            RepositoryException: 500,
            CursoException: 400,
            InvalidPropsException: 400,
            RepositoryDataNotFoundException: 404,
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

    // Adição e edição de cronogramas
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
}
