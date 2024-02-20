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
    Res,
    Req,
    UseGuards,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { BuscarTfgQuery } from '../application/queries/BuscarTfg.query'
import {
    CadastrarTfgUsecase,
    CadastrarTfgUsecaseProps,
} from '../application/usecases/tfg/CadastrarTfg.usecase'
import { TIPO_ENTREGA, Tfg } from '../domain/Tfg'
import { AbstractController } from './AbstractController'
import {
    AvaliarOrientacaoUsecase,
    AvaliarOrientacaoUsecaseProps,
} from '../application/usecases/tfg/AvaliarOrientacao.usecase'
import {
    CadastrarBancaUsecase,
    CadastrarBancaUsecaseProps,
} from '../application/usecases/tfg/CadastrarBanca.usecase'
import {
    EnviarTfgParcialUsecase,
    EnviarTfgParcialUsecaseProps,
} from '../application/usecases/tfg/EnviarTfgParcial.usecase'
import { Response } from 'express'
import { BaixarTfgUsecase } from '../application/usecases/tfg/BaixarTfg.usecase'
import { JwtAuthGuard } from 'src/shared/middlewares/AuthenticationMiddleware'
import {
    AvaliarNotaParcialUsecase,
    AvaliarNotaParcialUsecaseProps,
} from '../application/usecases/tfg/AvaliarNotaParcial.usecase'
import {
    AvaliarNotaFinalUsecase,
    AvaliarNotaFinalUsecaseProps,
} from '../application/usecases/tfg/AvaliarNotaFinal.usecase'
import { EnviarTfgFinalUsecase } from '../application/usecases/tfg/EnviarTfgFinal.usecase'

@Controller('tfg')
export class TfgController extends AbstractController {
    constructor(
        private readonly buscarTfgQuery: BuscarTfgQuery,
        private readonly cadastrarTfgUsecase: CadastrarTfgUsecase,
        private readonly avaliarOrientacaoUsecase: AvaliarOrientacaoUsecase,
        private readonly cadastrarBancaUsecase: CadastrarBancaUsecase,
        private readonly enviarTfgParcialUsecase: EnviarTfgParcialUsecase,
        private readonly baixarTfgUsecase: BaixarTfgUsecase,
        private readonly avaliarNotaParcial: AvaliarNotaParcialUsecase,
        private readonly avaliarNotaFinal: AvaliarNotaFinalUsecase,
        private readonly enviarTfgFinalUsecase: EnviarTfgFinalUsecase,
    ) {
        super({
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
            UsuarioException: 401,
            TfgException: 400,
        })
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public async getTfg(@Param('id') id: string): Promise<Tfg> {
        const result = await this.buscarTfgQuery.execute(id)

        return this.handleResponse(result)
    }

    // TODO: revisar a rota, se precisa enviar os dados todos logo de início
    @Post()
    @UseGuards(JwtAuthGuard)
    public async postTfg(
        @Req() req: any,
        @Body() body: CadastrarTfgUsecaseProps,
    ): Promise<void> {
        const result = await this.cadastrarTfgUsecase.execute({
            ...body,
            aluno: req.user.id,
        })

        return this.handleResponse(result)
    }

    @Patch('avaliar/:id')
    @UseGuards(JwtAuthGuard)
    public async avaliarOrientacao(
        @Param('id') id: string,
        @Body() body: AvaliarOrientacaoUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.avaliarOrientacaoUsecase.execute({
            ...body,
            tfgId: id,
            professorId: req.user.id,
        })

        return this.handleResponse(result)
    }

    @Put(':id/banca')
    @UseGuards(JwtAuthGuard)
    public async atribuirBanca(
        @Param('id') id: string,
        @Body() body: CadastrarBancaUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.cadastrarBancaUsecase.execute({
            ...body,
            tfgId: id,
            usuarioId: req.user.id,
        })

        return this.handleResponse(result)
    }

    @Put(':id/nota-parcial')
    @UseGuards(JwtAuthGuard)
    public async atribuirNotaParcial(
        @Param('id') id: string,
        @Req() req: any,
        @Body() body: AvaliarNotaParcialUsecaseProps,
    ) {
        const result = await this.avaliarNotaParcial.execute({
            ...body,
            tfgId: id,
            professorId: req.user.id,
        })

        return this.handleResponse(result)
    }

    // TODO: conferir Usecase
    @Put(':id/nota-final')
    @UseGuards(JwtAuthGuard)
    public async atribuirNotaFinal(
        @Param('id') id: string,
        @Req() req: any,
        @Body() body: AvaliarNotaFinalUsecaseProps,
    ) {
        const result = await this.avaliarNotaFinal.execute({
            ...body,
            tfgId: id,
            usuarioId: req.user.id,
        })

        return this.handleResponse(result)
    }

    // Download e upload de TFGs

    @Post(':id/parcial')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    public async enviarTfgParcial(
        @Param('id') id: string,
        @Req() req: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const result = await this.enviarTfgParcialUsecase.execute({
            usuarioId: req.user.id,
            tfgId: id,
            path: file.path,
        })

        return this.handleResponse(result)
    }

    @Post(':id/final')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    public async enviarTfgFinal(
        @Param('id') id: string,
        @Req() req: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const result = await this.enviarTfgFinalUsecase.execute({
            usuarioId: req.user.id,
            tfgId: id,
            path: file.path,
        })

        return this.handleResponse(result)
    }

    @Get(':id/download/parcial')
    @UseGuards(JwtAuthGuard)
    public async downloadTfgParcial(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const result = await this.baixarTfgUsecase.execute({
            id,
            tipoEntrega: TIPO_ENTREGA.PARCIAL,
        })

        if (!(result instanceof Error)) res.download(result)

        return this.handleResponse(result)
    }

    @Get(':id/download/final')
    @UseGuards(JwtAuthGuard)
    public async downloadTfgFinal(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const result = await this.baixarTfgUsecase.execute({
            id,
            tipoEntrega: TIPO_ENTREGA.FINAL,
        })

        if (!(result instanceof Error)) res.download(result)

        return this.handleResponse(result)
    }
}
