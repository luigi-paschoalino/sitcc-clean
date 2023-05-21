import { CadastrarUsuarioUseCase } from './application/usecases/CadastrarUsuario.usecase'
import { Controller, Get, Body, Param, Post, Logger, Res } from '@nestjs/common'
import { CriarUsuarioProps } from './domain/Usuario'
import { Response } from 'express'
import { Exception } from './domain/exceptions/Exception'

@Controller('usuarios')
export class UsuarioController {
    private logger = new Logger(UsuarioController.name)
    constructor(
        private readonly cadastrarUsuarioUseCase: CadastrarUsuarioUseCase,
    ) {}

    @Post()
    async cadastrar(@Body() body: CriarUsuarioProps, @Res() res: Response) {
        try {
            const result = await this.cadastrarUsuarioUseCase.execute(body)

            this.logger.debug(result)

            if (result instanceof Exception) {
                throw result
            }

            return res.status(201).send()
        } catch (error) {
            this.logger.error(error)
            return res.status(error.code).json({ message: error.message })
        }
    }
}
