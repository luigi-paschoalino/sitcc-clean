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
import { UniversidadeRepositoryImpl } from './infra/repositories/Universidade.repository'
import { TccRepositoryImpl } from './infra/repositories/Tcc.repository'
import { AuthServiceImpl } from './infra/services/Login.service'
import { AuthController } from './controllers/Auth.controller'
import { EventRepositoryImpl } from './infra/repositories/Event.repository'
import { EventPublisherServiceImpl } from './infra/services/EventPublisher.service'

@Module({
    imports: [CqrsModule],
    controllers: [
        TccController,
        UniversidadeController,
        UsuarioController,
        AuthController,
    ],
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
        {
            provide: 'UniversidadeRepository',
            useClass: UniversidadeRepositoryImpl,
        },
        {
            provide: 'TccRepository',
            useClass: TccRepositoryImpl,
        },
        {
            provide: 'EventRepository',
            useClass: EventRepositoryImpl,
        },
        {
            provide: 'EventPublisherService',
            useClass: EventPublisherServiceImpl,
        },
        {
            provide: 'AuthService',
            useClass: AuthServiceImpl,
        },
    ],
    exports: [],
})
export class CoreModule {}
