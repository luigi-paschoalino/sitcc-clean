import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { InvalidPropsException } from './../domain/exceptions/InvalidProps.exception'
import { AbstractController } from './AbstractController'
import { GerarCodigoProfessorUsecase } from '../application/usecases/GerarCodigoProfessor.usecase'
import { TokenInterceptor } from '../../middlewares/TokenCaptureMiddleware'
import { JwtAuthGuard } from '../../middlewares/AuthenticationMiddleware'

@Controller('codigo')
export class CodigoProfessorController extends AbstractController {
    constructor(
        // private readonly buscarCodigoQuery: BuscarCodigoProfessorQuery,
        private readonly gerarCodigoUsecase: GerarCodigoProfessorUsecase,
    ) {
        super({
            InvalidPropsException: 400,
        })
    }

    // @Get(':codigo')
    // async buscarCodigo(codigo: string): Promise<Error | string> {

    // }

    @Post()
    @UseInterceptors(JwtAuthGuard, TokenInterceptor)
    async gerarCodigo(@Body() body: any): Promise<Error | string> {
        const result = await this.gerarCodigoUsecase.execute(body.id)
        if (result instanceof Error) throw result

        return this.handleResponse(result)
    }
}
