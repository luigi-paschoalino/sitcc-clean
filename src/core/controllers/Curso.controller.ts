import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Patch,
} from '@nestjs/common'
import {
    CadastrarCursoUsecase,
    CadastrarCursoUsecaseProps,
} from '../application/usecases/curso/CadastrarCurso.usecase'
import { AbstractController } from './AbstractController'
import { ListarCursosQuery } from '../application/queries/ListarCursos.query'
import { BuscarCursoQuery } from '../application/queries/BuscarCurso.query'
import { JwtAuthGuard } from '../../shared/middlewares/AuthenticationMiddleware'
import {
    EditarCursoUsecase,
    EditarCursoUsecaseProps,
} from '../application/usecases/curso/EditarCurso.usecase'

@Controller('cursos')
export class CursoController extends AbstractController {
    constructor(
        private readonly buscarCursoQuery: BuscarCursoQuery,
        private readonly listarCursosQuery: ListarCursosQuery,
        private readonly cadastrarCursoUsecase: CadastrarCursoUsecase,
        private readonly editarCursoUsecase: EditarCursoUsecase,
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

    //TODO: rota para editar curso
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
}
