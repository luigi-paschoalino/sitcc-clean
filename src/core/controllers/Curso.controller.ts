import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import {
    CadastrarCursoUsecase,
    CadastrarCursoUsecaseProps,
} from '../application/usecases/CadastrarCurso.usecase'
import { AbstractController } from './AbstractController'
import { ListarCursosQuery } from '../application/queries/ListarCursos.query'
import { BuscarCursoQuery } from '../application/queries/BuscarCurso.query'
import { JwtAuthGuard } from '../../middlewares/AuthenticationMiddleware'

@Controller('cursos')
export class CursoController extends AbstractController {
    constructor(
        private readonly buscarCursoQuery: BuscarCursoQuery,
        private readonly listarCursosQuery: ListarCursosQuery,
        private readonly cadastrarCursoUsecase: CadastrarCursoUsecase,
    ) {
        super({
            RepositoryException: 500,
            CursoException: 400,
            InvalidPropsException: 400,
            RepositoryDataNotFoundException: 404,
        })
    }

    @Get()
    public async listCursos() {
        const result = await this.listarCursosQuery.execute()

        return this.handleResponse(result)
    }

    @Get(':id')
    public async getCurso(@Param('id') id: string) {
        const result = await this.buscarCursoQuery.execute({
            id,
        })

        return this.handleResponse(result)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    public async cadastrarCurso(@Body() request: CadastrarCursoUsecaseProps) {
        const result = await this.cadastrarCursoUsecase.execute(request)

        return this.handleResponse(result)
    }

    //TODO: rota para editar curso
}
