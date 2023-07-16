import { Controller, Get, Post } from '@nestjs/common'
import { InvalidPropsException } from './../domain/exceptions/InvalidProps.exception'
import { AbstractController } from './AbstractController'
import { GerarCodigoProfessorUsecase } from '../application/usecases/GerarCodigoProfessor.usecase'

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
    async gerarCodigo(): Promise<Error | string> {
        const result = await this.gerarCodigoUsecase.execute()
        if (result instanceof Error) throw result

        return this.handleResponse(result)
    }
}
