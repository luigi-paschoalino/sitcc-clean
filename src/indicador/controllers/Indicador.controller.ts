import { Controller, Get, Query } from '@nestjs/common'
import { AbstractController } from '../../shared/controllers/AbstractController'
import { BuscarIndicadorQuery } from '../application/queries/BuscarIndicador.query'

@Controller('indicadores')
export class IndicadorController extends AbstractController {
    constructor(private readonly buscarIndicadorQuery: BuscarIndicadorQuery) {
        super({
            UsuarioException: 400,
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
        })
    }

    @Get()
    async buscarIndicador() {
        const result = await this.buscarIndicadorQuery.execute()

        return this.handleResponse(result)
    }
}
