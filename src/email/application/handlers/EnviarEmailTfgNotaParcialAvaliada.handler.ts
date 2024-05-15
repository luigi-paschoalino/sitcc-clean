import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { TfgNotaParcialAvaliadaEvent } from '../../../core/domain/events/TfgNotaParcialAvaliada.event'
import { Tfg } from '../../domain/Tfg'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'

@EventsHandler(TfgNotaParcialAvaliadaEvent)
export class EnviarEmailTfgNotaParcialAvaliadaHandler
    implements IEventHandler<TfgNotaParcialAvaliadaEvent>
{
    private logger = new Logger(EnviarEmailTfgNotaParcialAvaliadaHandler.name)

    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        @Inject('BuscarTfgService')
        private readonly buscarTfgService: BuscarTfgService,
    ) {}

    async handle(props: TfgNotaParcialAvaliadaEvent): Promise<Error | void> {
        try {
            const tfg = await this.buscarTfgService.buscar(props.data.id)
            if (tfg instanceof Error) throw tfg

            // Montando email para o aluno
            const email = await this.enviarEmailService.enviar(
                tfg.getAluno().email,
                'Avaliação parcial do TFG',
                this.montarMensagem(tfg),
            )
            if (email instanceof Error) throw email
        } catch (error) {
            this.logger.error(
                `${typeof error}: ${JSON.stringify(error.message, null, 2)}`,
            )
        }
    }

    private montarMensagem(tfg: Tfg): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${tfg.getAluno().nome}</b>!</p>
                <p>O TFG foi avaliado pelo seu orientador com a nota <b>${tfg.getNotaParcial()}</b> </p>
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
                <p>Para mais informações, acesse o sistema.</p>
              </body>
            </html>
        `
    }
}
