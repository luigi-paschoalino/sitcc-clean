import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common'
import { BuscarTccQuery } from '../application/queries/BuscarTcc.query'
import {
    CadastrarTccUsecase,
    CadastrarTccUsecaseProps,
} from '../application/usecases/CadastrarTcc.usecase'
import { Tcc } from '../domain/Tcc'
import { AbstractController } from './AbstractController'
import {
    AvaliarOrientacaoUsecase,
    AvaliarOrientacaoUsecaseProps,
} from '../application/usecases/AvaliarOrientacao.usecase'

@Controller('tcc')
export class TccController extends AbstractController {
    constructor(
        private readonly buscarTccQuery: BuscarTccQuery,
        private readonly cadastrarTccUsecase: CadastrarTccUsecase,
        private readonly avaliarOrientacaoUsecase: AvaliarOrientacaoUsecase,
    ) {
        super({
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
            UsuarioException: 400,
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

    @Patch('avaliar/:id')
    public async avaliarOrientacao(
        @Param('id') id: string,
        @Body() body: AvaliarOrientacaoUsecaseProps,
    ) {
        const result = await this.avaliarOrientacaoUsecase.execute({
            ...body,
            tccId: id,
        })

        return this.handleResponse(result)
    }
}
