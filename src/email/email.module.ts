import { Module } from '@nestjs/common'
import { EnviarEmailOrientacaoSolicitadaHandler } from './application/EnviarEmailOrientacaoSolicitada.handler'
import { EnviarEmailOrientacaoAprovadaHandler } from './application/EnviarEmailOrientacaoAprovada.handler'
import { BuscarTfgServiceImpl } from './infra/services/BuscarTfg.service'
import { EnviarEmailOrientacaoRecusadaHandler } from './application/EnviarEmailOrientacaoRecusada.handler'
import { EnviarEmailServiceImpl } from './infra/services/EnviarEmail.service'

@Module({
    imports: [],
    providers: [
        EnviarEmailOrientacaoSolicitadaHandler,
        EnviarEmailOrientacaoAprovadaHandler,
        EnviarEmailOrientacaoRecusadaHandler,
        EnviarEmailTfgParcialEnviadoHandler,
        EnviarEmailTfgParcialAvaliadoHandler,
        EnviarEmailTfgFinalEnviadoHandler,
        // TODO: validar se aprovação e reprovação do TFG são eventos distintos
        EnviarEmailTfgFinalAvaliadoHandler,
        {
            provide: 'BuscarTfgService',
            useClass: BuscarTfgServiceImpl,
        },
        {
            provide: 'EnviarEmailService',
            useClass: EnviarEmailServiceImpl,
        },
    ],
})
export class EmailModule {}
