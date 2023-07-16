import { Module } from '@nestjs/common'
import { TccController } from './controllers/Tcc.controller'
import { UniversidadeController } from './controllers/Universidade.controller'
import { UsuarioController } from './controllers/Usuario.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'
import * as path from 'path'
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
import { EncriptarSenhaServiceImpl } from './infra/services/EncriptarSenha.service'
import { CodigoProfessorController } from './controllers/CodigoProfessor.controller'
import { CodigoProfessorRepositoryImpl } from './infra/repositories/CodigoProfessor.repository'
import { GerarCodigoServiceImpl } from './infra/services/GerarCodigo.service'
import { MoverTccServiceImpl } from './infra/services/MoverTcc.service'

@Module({
    imports: [
        CqrsModule,
        MulterModule.register({
            storage: multer.diskStorage({
                destination: path.join(process.cwd(), 'files', 'tfgs', 'temp'),
                filename: (req, file, cb) => {
                    cb(null, file.originalname)
                },
            }),
            limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
            fileFilter: (req, file, cb) => {
                if (path.extname(file.originalname) !== '.pdf') {
                    // Rejeita o arquivo se não for PDF
                    return cb(
                        new Error('Somente arquivos PDF são permitidos!'),
                        false,
                    )
                }
                cb(null, true)
            },
        }),
    ],
    controllers: [
        TccController,
        UniversidadeController,
        UsuarioController,
        AuthController,
        CodigoProfessorController,
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
            provide: 'CodigoProfessorRepository',
            useClass: CodigoProfessorRepositoryImpl,
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
        {
            provide: 'EncriptarSenhaService',
            useClass: EncriptarSenhaServiceImpl,
        },
        {
            provide: 'GerarCodigoService',
            useClass: GerarCodigoServiceImpl,
        },
        {
            provide: 'MoverTccService',
            useFactory: () => {
                return new MoverTccServiceImpl(process.env.TCC_FINAL_PATH)
            },
        },
    ],
    exports: [],
})
export class CoreModule {}
