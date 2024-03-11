import { Module } from '@nestjs/common'
import { EnviarEmailOrientacaoSolicitadaHandler } from './application/EnviarEmailOrientacaoSolicitada.handler'

@Module({
    imports: [],
    providers: [
        EnviarEmailOrientacaoSolicitadaHandler,
        EnviarEmailOrientacaoAprovadaHandler,
        EnviarEmailOrientacaoRecusadaHandler,
        EnviarEmailTfgParcialEnviadoHandler,
        EnviarEmailTfgParcialAvaliadoHandler,
        EnviarEmailTfgFinalEnviadoHandler,
        EnviarEmailTfgFinalAvaliadoHandler,
    ],
})
export class EmailModule {}
