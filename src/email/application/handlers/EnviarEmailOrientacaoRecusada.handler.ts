import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import { TfgOrientacaoRecusadaEvent } from '../../../core/domain/events/TfgOrientacaoRecusada.event'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { Tfg } from '../../domain/Tfg'

@EventsHandler(TfgOrientacaoRecusadaEvent)
export class EnviarEmailOrientacaoRecusadaHandler
    implements IEventHandler<TfgOrientacaoRecusadaEvent>
{
    private logger = new Logger(EnviarEmailOrientacaoRecusadaHandler.name)

    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        @Inject('BuscarTfgService')
        private readonly buscarTfgService: BuscarTfgService,
    ) {}

    async handle(props: TfgOrientacaoRecusadaEvent): Promise<Error | void> {
        try {
            // Montando email para o aluno
            const tfg = await this.buscarTfgService.buscar(props.data.id)
            if (tfg instanceof Error) throw tfg

            const email = await this.enviarEmailService.enviar(
                tfg.getAluno().email,
                'O seu orientador respondeu à sua solicitação de TFG',
                this.montarMensagem(tfg, props.data.justificativa),
            )
            if (email instanceof Error) throw email
        } catch (error) {
            this.logger.error(
                `${typeof error}: ${JSON.stringify(error.message, null, 2)}`,
            )
        }
    }

    private montarMensagem(tfg: Tfg, justificativa: string): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${tfg.getAluno().nome}</b>!</p>
                <p>A sua solicitação de orientação de TFG foi <b>RECUSADA</b>!</p>
                <br>
                <p>Informações sobre o TFG:</p>
                <ul>
                  <li><b>Título:</b> ${tfg.getTitulo()}</li>
                  <li><b>Aluno:</b> ${tfg.getAluno().nome}</li>
                  <li><b>Orientador:</b> ${tfg.getOrientador().nome}</li>
                  <li><b>Coorientador:</b> ${
                      tfg.getCoorientador()?.nome ?? 'SEM COORIENTADOR'
                  }</li>
                  <br>
                </ul>
                <p>Justificativa: ${justificativa}</p>
              </body>
            </html>
        `
    }
}
