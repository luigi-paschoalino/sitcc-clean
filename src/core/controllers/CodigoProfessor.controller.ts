import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AbstractController } from '../../shared/controllers/AbstractController'
import { GerarCodigoProfessorUsecase } from '../application/usecases/codigoProfessor/GerarCodigoProfessor.usecase'
import { JwtAuthGuard } from '../../shared/middlewares/AuthenticationMiddleware'
import { ListarCodigosProfessorQuery } from '../application/usecases/codigoProfessor/ListarCodigosProfessor.query'

@Controller('codigo')
export class CodigoProfessorController extends AbstractController {
    constructor(
        private readonly gerarCodigoUsecase: GerarCodigoProfessorUsecase,
        private readonly listarCodigosQuery: ListarCodigosProfessorQuery,
    ) {
        super({
            InvalidPropsException: 400,
        })
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async listarCodigos(@Req() req: any): Promise<Error | string> {
        const result = await this.listarCodigosQuery.execute({
            usuarioId: req.user.id,
        })
        if (result instanceof Error) throw result

        return this.handleResponse(result)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async gerarCodigo(
        @Body() body: any,
        @Req() req: any,
    ): Promise<Error | string> {
        const result = await this.gerarCodigoUsecase.execute({
            ...body,
            usuarioId: req.user.id,
        })
        if (result instanceof Error) throw result

        return this.handleResponse(result)
    }
}
