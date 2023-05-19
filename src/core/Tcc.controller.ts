import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { BuscarTccQuery } from './application/queries/BuscarTcc.query'
import {
    CadastrarTccUsecase,
    CadastrarTccUsecaseProps,
} from './application/usecases/CadastrarTcc.usecase'
import { Tcc } from './domain/Tcc'

@Controller('tcc')
export class TccController {
    constructor(
        private readonly buscarTccQuery: BuscarTccQuery,
        private readonly cadastrarTccUsecase: CadastrarTccUsecase,
    ) {}
    @Get(':id')
    public async getTcc(@Param('id') id: string): Promise<Tcc> {
        const result = await this.buscarTccQuery.execute(id)
        return result
    }

    @Post()
    public async postTcc(
        @Body() body: CadastrarTccUsecaseProps,
    ): Promise<void> {
        await this.cadastrarTccUsecase.execute(body)
        return
    }
}
