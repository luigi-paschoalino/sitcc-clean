import { EventsHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import {
    TfgOrientacaoAprovadaEvent,
    TfgOrientacaoAprovadaEventProps,
} from '../../../core/domain/events/TfgOrientacaoAprovada.event'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { Tfg } from '../../domain/Tfg'

@EventsHandler(TfgOrientacaoAprovadaEvent)
export class EnviarEmailOrientacaoAprovadaHandler {
    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        @Inject('BuscarTfgService')
        private readonly buscarTfgService: BuscarTfgService,
    ) {}

    async handle(
        props: TfgOrientacaoAprovadaEventProps,
    ): Promise<Error | void> {
        try {
            const tfg = await this.buscarTfgService.buscar(props.id)
            if (tfg instanceof Error) throw tfg

            const aluno = await this.enviarEmailService.enviar(
                tfg.getAluno().email,
                'A sua solicitação de TFG foi cadastrada com sucesso!',
                this.montarMensagem(tfg),
            )

            if (aluno instanceof Error) throw aluno
        } catch (error) {
            return error
        }
    }

    private montarMensagem(tfg: Tfg): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${tfg.getAluno().nome}</b>!</p>
                <p>A sua solicitação de orientação de TFG foi aprovada com sucesso!</p>
                <br><br>
                <p>Informações sobre o TFG:</p>
                <ul>
                  <li><b>Título:</b> ${tfg.getTitulo()}</li>
                  <li><b>Aluno:</b> ${tfg.getAluno().nome}</li>
                  <li><b>Orientador:</b> ${tfg.getOrientador().nome}</li>
                  <li><b>Coorientador:</b> ${
                      tfg.getCoorientador().nome ?? 'SEM COORIENTADOR'
                  }</li>
                  <br>
                <p>Estamos ansiosos para ver suas contribuições e desejamos sucesso em seu projeto!</p>
              </body>
            </html>
        `
    }
}
