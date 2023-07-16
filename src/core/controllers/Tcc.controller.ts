import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Put,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
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
import {
    CadastrarBancaUsecase,
    CadastrarBancaUsecaseProps,
} from '../application/usecases/CadastrarBanca.usecase'
import {
    EnviarTccParcialUsecase,
    EnviarTccParcialUsecaseProps,
} from '../application/usecases/EnviarTccParcial.usecase'

@Controller('tcc')
export class TccController extends AbstractController {
    constructor(
        private readonly buscarTccQuery: BuscarTccQuery,
        private readonly cadastrarTccUsecase: CadastrarTccUsecase,
        private readonly avaliarOrientacaoUsecase: AvaliarOrientacaoUsecase,
        private readonly cadastrarBancaUsecase: CadastrarBancaUsecase,
        private readonly enviarTccParcialUsecase: EnviarTccParcialUsecase,
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

    // TODO: revisar a rota, se precisa enviar os dados todos logo de início
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

    @Put(':id/banca')
    public async atribuirBanca(
        @Param('id') id: string,
        @Body() body: CadastrarBancaUsecaseProps,
    ) {
        const result = await this.cadastrarBancaUsecase.execute({
            ...body,
            tccId: id,
        })

        return this.handleResponse(result)
    }

    // Download e upload de TCCs

    @Post(':id/parcial')
    @UseInterceptors(FileInterceptor('file'))
    public async enviarTccParcial(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: EnviarTccParcialUsecaseProps,
    ) {
        const result = await this.enviarTccParcialUsecase.execute({
            usuarioId: body.usuarioId, // TODO: pegar o usuário logado
            tccId: id,
            path: file.path,
        })

        return this.handleResponse(result)
    }

    //TODO: implementar rota para nota parcial (banca ou TCC?)
}
