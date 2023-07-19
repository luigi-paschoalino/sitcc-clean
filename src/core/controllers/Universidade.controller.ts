import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import {
    CadastrarUniversidadeUsecase,
    CadastrarUniversidadeUsecaseProps,
} from '../application/usecases/CadastrarUniversidade.usecase'
import { AbstractController } from './AbstractController'
import { BuscarUniversidadeQuery } from '../application/queries/BuscarUniversidade.query'
import { ListarUniversidadesQuery } from '../application/queries/ListarUniversidades.query'
import {
    CadastrarInstitutoUsecase,
    CadastrarInstitutoUsecaseProps,
} from '../application/usecases/CadastrarInstituto.usecase'
import { BuscarInstitutoQuery } from '../application/queries/BuscarInstituto.query'
import { BuscarCursoQuery } from '../application/queries/BuscarCurso.query'
import {
    CadastrarCursoUsecase,
    CadastrarCursoUsecaseProps,
} from '../application/usecases/CadastrarCurso.usecase'
import { JwtAuthGuard } from '../../middlewares/AuthenticationMiddleware'

@Controller('universidades')
export class UniversidadeController extends AbstractController {
    constructor(
        private readonly cadastrarUniversidadeUsecase: CadastrarUniversidadeUsecase,
        private readonly buscarUniversidadeQuery: BuscarUniversidadeQuery,
        private readonly listarUniversidadesQuery: ListarUniversidadesQuery,
        private readonly cadastrarInstitutoUsecase: CadastrarInstitutoUsecase,
        private readonly cadastrarCursoUsecase: CadastrarCursoUsecase,
        private readonly buscarInstitutoQuery: BuscarInstitutoQuery,
        private readonly buscarCursoQuery: BuscarCursoQuery,
    ) {
        super({
            RepositoryException: 500,
            UniversidadeException: 400,
            InvalidPropsException: 400,
            RepositoryDataNotFoundException: 404,
        })
    }

    @Get()
    public async listUniversidades() {
        const result = await this.listarUniversidadesQuery.execute()

        return this.handleResponse(result)
    }

    @Get(':id')
    public async getUniversidade(@Param('id') id: string) {
        const result = await this.buscarUniversidadeQuery.execute(id)

        return this.handleResponse(result)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    public async cadastrarUniversidade(
        @Body() request: CadastrarUniversidadeUsecaseProps,
    ) {
        const result = await this.cadastrarUniversidadeUsecase.execute(request)

        return this.handleResponse(result)
    }

    @Post('institutos')
    @UseGuards(JwtAuthGuard)
    public async cadastrarInstituto(
        @Body() request: CadastrarInstitutoUsecaseProps,
    ) {
        const result = await this.cadastrarInstitutoUsecase.execute(request)
        return this.handleResponse(result)
    }

    @Get('institutos/:id')
    @UseGuards(JwtAuthGuard)
    public async getInstituto(@Param('id') id: string) {
        const result = await this.buscarInstitutoQuery.execute({
            institutoId: id,
        })

        return this.handleResponse(result)
    }

    @Post('cursos')
    @UseGuards(JwtAuthGuard)
    public async cadastrarCurso(@Body() request: CadastrarCursoUsecaseProps) {
        const result = await this.cadastrarCursoUsecase.execute(request)

        return this.handleResponse(result)
    }

    @Get('cursos/:id')
    @UseGuards(JwtAuthGuard)
    public async buscarCurso(@Param('id') id: string) {
        const result = await this.buscarCursoQuery.execute({
            cursoId: id,
        })

        return this.handleResponse(result)
    }
}
