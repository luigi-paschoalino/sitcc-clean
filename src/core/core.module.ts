import { Module } from '@nestjs/common'
import { TccController } from './Tcc.controller'
import { UseCases } from './application/usecases'
import { Queries } from './application/queries'
import { UniversidadeController } from './Universidade.controller'
import { UsuarioController } from './Usuario.controller'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
    imports: [CqrsModule],
    controllers: [TccController, UniversidadeController, UsuarioController],
    providers: [...UseCases, ...Queries],
    exports: [],
})
export class CoreModule {}
