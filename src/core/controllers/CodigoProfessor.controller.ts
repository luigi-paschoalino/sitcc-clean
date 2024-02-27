import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AbstractController } from '../../shared/controllers/AbstractController'
import { GerarCodigoProfessorUsecase } from '../application/usecases/codigoProfessor/GerarCodigoProfessor.usecase'
import { JwtAuthGuard } from '../../shared/middlewares/AuthenticationMiddleware'

@Controller('codigo')
export class CodigoProfessorController extends AbstractController {
    constructor(
        private readonly gerarCodigoUsecase: GerarCodigoProfessorUsecase,
    ) {
        super({
            InvalidPropsException: 400,
        })
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async gerarCodigo(@Body() body: any): Promise<Error | string> {
        const result = await this.gerarCodigoUsecase.execute(body)
        if (result instanceof Error) throw result

        return this.handleResponse(result)
    }
}
