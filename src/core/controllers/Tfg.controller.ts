import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Req,
    Res,
    StreamableFile,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import fs from 'fs'
import path from 'path'
import { JwtAuthGuard } from 'src/shared/middlewares/AuthenticationMiddleware'
import { AbstractController } from '../../shared/controllers/AbstractController'
import { BuscarTfgQuery } from '../application/queries/BuscarTfg.query'
import { ListarTfgsPorUsuarioQuery } from '../application/queries/ListarTfgsPorUsuario.query'
import {
    AvaliarNotaFinalUsecase,
    AvaliarNotaFinalUsecaseProps,
} from '../application/usecases/tfg/AvaliarNotaFinal.usecase'
import {
    AvaliarNotaParcialUsecase,
    AvaliarNotaParcialUsecaseProps,
} from '../application/usecases/tfg/AvaliarNotaParcial.usecase'
import {
    AvaliarOrientacaoUsecase,
    AvaliarOrientacaoUsecaseProps,
} from '../application/usecases/tfg/AvaliarOrientacao.usecase'
import { BaixarTfgUsecase } from '../application/usecases/tfg/BaixarTfg.usecase'
import {
    CadastrarBancaUsecase,
    CadastrarBancaUsecaseProps,
} from '../application/usecases/tfg/CadastrarBanca.usecase'
import {
    CadastrarTfgUsecase,
    CadastrarTfgUsecaseProps,
} from '../application/usecases/tfg/CadastrarTfg.usecase'
import {
    EditarBancaUsecase,
    EditarBancaUsecaseProps,
} from '../application/usecases/tfg/EditarBanca.usecase'
import { EnviarTfgFinalUsecase } from '../application/usecases/tfg/EnviarTfgFinal.usecase'
import { EnviarTfgParcialUsecase } from '../application/usecases/tfg/EnviarTfgParcial.usecase'
import { TIPO_ENTREGA, Tfg } from '../domain/Tfg'
import { ListarBancasPorUsuarioQuery } from '../application/queries/ListarBancasPorUsuario.query'

@Controller('tfg')
export class TfgController extends AbstractController {
    constructor(
        private readonly buscarTfgQuery: BuscarTfgQuery,
        private readonly cadastrarTfgUsecase: CadastrarTfgUsecase,
        private readonly avaliarOrientacaoUsecase: AvaliarOrientacaoUsecase,
        private readonly cadastrarBancaUsecase: CadastrarBancaUsecase,
        private readonly editarBancaUsecase: EditarBancaUsecase,
        private readonly enviarTfgParcialUsecase: EnviarTfgParcialUsecase,
        private readonly baixarTfgUsecase: BaixarTfgUsecase,
        private readonly avaliarNotaParcial: AvaliarNotaParcialUsecase,
        private readonly avaliarNotaFinal: AvaliarNotaFinalUsecase,
        private readonly enviarTfgFinalUsecase: EnviarTfgFinalUsecase,
        private readonly listarTfgsPorUsuarioQuery: ListarTfgsPorUsuarioQuery,
        private readonly listarBancasPorUsuarioQuery: ListarBancasPorUsuarioQuery,
    ) {
        super({
            RepositoryException: 500,
            RepositoryDataNotFoundException: 404,
            InvalidPropsException: 400,
            UsuarioException: 401,
            TfgException: 400,
            BancaException: 400,
        })
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getTfgs(@Req() req: any): Promise<Tfg[]> {
        const result = await this.listarTfgsPorUsuarioQuery.execute({
            tipoUsuario: req.user.tipo,
            usuarioId: req.user.id,
        })

        return this.handleResponse(result)
    }

    @Get('bancas')
    @UseGuards(JwtAuthGuard)
    public async getBancas(@Req() req: any) {
        const result = await this.listarBancasPorUsuarioQuery.execute({
            usuarioId: req.user.id,
        })

        return this.handleResponse(result)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public async getTfg(@Param('id') id: string): Promise<Tfg> {
        const result = await this.buscarTfgQuery.execute(id)

        return this.handleResponse(result)
    }

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

    @Patch(':id/banca')
    @UseGuards(JwtAuthGuard)
    public async editarBanca(
        @Param('id') id: string,
        @Body() body: EditarBancaUsecaseProps,
        @Req() req: any,
    ) {
        const result = await this.editarBancaUsecase.execute({
            ...body,
            tfgId: id,
            usuarioTipo: req.user.tipo,
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

    @Get(':id/download/:tipo')
    public async downloadTfgParcial(
        @Param('id') id: string,
        @Param('tipo') tipoEntrega: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.baixarTfgUsecase.execute({
            id,
            tipoEntrega: tipoEntrega.toLocaleUpperCase() as TIPO_ENTREGA,
        })

        if (result instanceof Error) return this.handleResponse(result)

        const file = fs.createReadStream(result)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${path.basename(result)}`,
        )

        return new StreamableFile(file)
    }
}
