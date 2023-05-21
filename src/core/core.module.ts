import { UsuarioRepository } from './domain/repositories/Usuario.repository'
import { Module } from '@nestjs/common'
import { TccController } from './Tcc.controller'
import { UniversidadeController } from './Universidade.controller'
import { UsuarioController } from './Usuario.controller'
import { CqrsModule } from '@nestjs/cqrs'
import UseCases from './application/usecases'
import Queries from './application/queries'
import { UniqueIdServiceImpl } from './infra/services/UniqueID.service'
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository'

@Module({
    imports: [CqrsModule],
    controllers: [TccController, UniversidadeController, UsuarioController],
    providers: [
        ...UseCases,
        ...Queries,
        {
            provide: 'UniqueIdService',
            useClass: UniqueIdServiceImpl,
        },
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
    ],
    exports: [],
})
export class CoreModule {}
