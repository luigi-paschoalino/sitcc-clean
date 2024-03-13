import { Module } from '@nestjs/common'
import { EnviarEmailOrientacaoSolicitadaHandler } from './application/handlers/EnviarEmailOrientacaoSolicitada.handler'
import { EnviarEmailOrientacaoAprovadaHandler } from './application/handlers/EnviarEmailOrientacaoAprovada.handler'
import { BuscarTfgServiceImpl } from './infra/services/BuscarTfg.service'
import { EnviarEmailOrientacaoRecusadaHandler } from './application/handlers/EnviarEmailOrientacaoRecusada.handler'
import { EnviarEmailServiceImpl } from './infra/services/EnviarEmail.service'
import { EnviarEmailTfgEnviadoHandler } from './application/handlers/EnviarEmailTfgEnviado.handler'
import { EnviarEmailTfgNotaParcialAvaliadaHandler } from './application/handlers/EnviarEmailTfgNotaParcialAvaliada.handler'
import { EnviarEmailTfgFinalizadoHandler } from './application/handlers/EnviarEmailTfgFinalizado.handler'
import { EnviarEmailService } from './domain/services/EnviarEmail.service'
import { EnviarEmailCodigoProfessorGeradoHandler } from './application/handlers/EnviarEmailCodigoProfessorGerado.handler'

@Module({
    imports: [],
    providers: [
        EnviarEmailOrientacaoSolicitadaHandler,
        EnviarEmailOrientacaoAprovadaHandler,
        EnviarEmailOrientacaoRecusadaHandler,
        EnviarEmailTfgEnviadoHandler,
        EnviarEmailTfgNotaParcialAvaliadaHandler,
        EnviarEmailTfgFinalizadoHandler,

        {
            provide: 'BuscarTfgService',
            useClass: BuscarTfgServiceImpl,
        },
        {
            provide: 'EnviarEmailService',
            useFactory: () => {
                return new EnviarEmailServiceImpl(
                    process.env.EMAIL_SERVICE_EMAIL,
                    process.env.EMAIL_SERVICE_PASS,
                )
            },
        },
        {
            provide: 'EnviarEmailCodigoProfessorGeradoHandler',
            useFactory: (enviarEmailService: EnviarEmailService) => {
                return new EnviarEmailCodigoProfessorGeradoHandler(
                    enviarEmailService,
                    process.env.FRONTEND_URL,
                )
            },
            inject: ['EnviarEmailService'],
        },
    ],
})
export class EmailModule {}
