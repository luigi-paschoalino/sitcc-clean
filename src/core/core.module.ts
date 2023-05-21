import { Module } from '@nestjs/common'
import { TccController } from './controllers/Tcc.controller'
import { UniversidadeController } from './controllers/Universidade.controller'
import { UsuarioController } from './controllers/Usuario.controller'
import { CqrsModule } from '@nestjs/cqrs'
import UseCases from './application/usecases'
import Queries from './application/queries'
import { UniqueIdServiceImpl } from './infra/services/UniqueID.service'
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository'
import Mappers from './infra/mappers'

@Module({
    imports: [CqrsModule],
    controllers: [TccController, UniversidadeController, UsuarioController],
    providers: [
        ...UseCases,
        ...Queries,
        ...Mappers,
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
