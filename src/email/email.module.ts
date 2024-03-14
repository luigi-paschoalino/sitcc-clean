import { Module } from '@nestjs/common'
import { EnviarEmailOrientacaoSolicitadaHandler } from './application/handlers/EnviarEmailOrientacaoSolicitada.handler'
import { EnviarEmailOrientacaoAprovadaHandler } from './application/handlers/EnviarEmailOrientacaoAprovada.handler'
import { BuscarTfgServiceImpl } from './infra/services/BuscarTfg.service'
import { EnviarEmailOrientacaoRecusadaHandler } from './application/handlers/EnviarEmailOrientacaoRecusada.handler'
import { EnviarEmailServiceImpl } from './infra/services/EnviarEmail.service'
import { EnviarEmailTfgEnviadoHandler } from './application/handlers/EnviarEmailTfgEnviado.handler'
import { EnviarEmailTfgNotaParcialAvaliadaHandler } from './application/handlers/EnviarEmailTfgNotaParcialAvaliada.handler'
import { EnviarEmailTfgFinalizadoHandler } from './application/handlers/EnviarEmailTfgFinalizado.handler'
import { EnviarEmailCodigoProfessorGeradoHandler } from './application/handlers/EnviarEmailCodigoProfessorGerado.handler'
import { PrismaService } from '../shared/infra/database/prisma/prisma.service'

@Module({
    imports: [],
    providers: [
        EnviarEmailOrientacaoSolicitadaHandler,
        EnviarEmailOrientacaoAprovadaHandler,
        EnviarEmailOrientacaoRecusadaHandler,
        EnviarEmailTfgEnviadoHandler,
        EnviarEmailTfgNotaParcialAvaliadaHandler,
        EnviarEmailTfgFinalizadoHandler,
        EnviarEmailCodigoProfessorGeradoHandler,
        {
            provide: 'BuscarTfgService',
            useClass: BuscarTfgServiceImpl,
        },
        {
            provide: 'EnviarEmailService',
            useValue: new EnviarEmailServiceImpl(
                process.env.EMAIL_SERVICE_EMAIL,
                process.env.EMAIL_SERVICE_API_KEY,
            ),
        },
        {
            provide: 'PrismaService',
            useClass: PrismaService,
        },
    ],
})
export class EmailModule {}
