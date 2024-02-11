import { Module } from '@nestjs/common'
import { TccController } from './controllers/Tcc.controller'
import { CursoController } from './controllers/Curso.controller'
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
import { CursoRepositoryImpl } from './infra/repositories/Curso.repository'
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
import { Handlers } from './application/handlers'
import { HttpModule } from '@nestjs/axios'
import { PrismaService } from '../shared/infra/database/prisma/prisma.service'
import { CursoMapper } from './infra/mappers/Curso.mapper'

@Module({
    imports: [
        HttpModule,
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
        CursoController,
        UsuarioController,
        AuthController,
        CodigoProfessorController,
    ],
    providers: [
        ...UseCases,
        ...Queries,
        ...Mappers,
        ...Handlers,
        {
            provide: 'PrismaService',
            useClass: PrismaService,
        },
        {
            provide: 'UniqueIdService',
            useClass: UniqueIdServiceImpl,
        },
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
        {
            provide: 'CursoRepository',
            useFactory(prismaService: PrismaService, cursoMapper: CursoMapper) {
                return new CursoRepositoryImpl(prismaService, cursoMapper)
            },
            inject: ['PrismaService'],
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
