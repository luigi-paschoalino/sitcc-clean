import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { BuscarTccQuery } from '../application/queries/BuscarTcc.query'
import {
    CadastrarTccUsecase,
    CadastrarTccUsecaseProps,
} from '../application/usecases/CadastrarTcc.usecase'
import { Tcc } from '../domain/Tcc'
import { AbstractController } from './AbstractController'

@Controller('tcc')
export class TccController extends AbstractController {
    constructor(
        private readonly buscarTccQuery: BuscarTccQuery,
        private readonly cadastrarTccUsecase: CadastrarTccUsecase,
    ) {
        super({
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
        })
    }
    @Get(':id')
    public async getTcc(@Param('id') id: string): Promise<Tcc> {
        const result = await this.buscarTccQuery.execute(id)

        return this.handleResponse(result)
    }

    @Post()
    public async postTcc(
        @Body() body: CadastrarTccUsecaseProps,
    ): Promise<void> {
        const result = await this.cadastrarTccUsecase.execute(body)

        return this.handleResponse(result)
    }
}
