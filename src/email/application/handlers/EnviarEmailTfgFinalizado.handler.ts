import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { TfgFinalizadoEvent } from '../../../core/domain/events/TfgFinalizado.event'
import { Tfg } from '../../domain/Tfg'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'

@EventsHandler(TfgFinalizadoEvent)
export class EnviarEmailTfgFinalizadoHandler
    implements IEventHandler<TfgFinalizadoEvent>
{
    private logger = new Logger(EnviarEmailTfgFinalizadoHandler.name)

    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        @Inject('BuscarTfgService')
        private readonly buscarTfgService: BuscarTfgService,
    ) {}

    async handle(props: TfgFinalizadoEvent): Promise<Error | void> {
        try {
            const tfg = await this.buscarTfgService.buscar(props.data.id)
            if (tfg instanceof Error) throw tfg

            // Montando email para o aluno
            const email = await this.enviarEmailService.enviar(
                tfg.getAluno().email,
                'Avaliação final do TFG',
                this.montarMensagem(tfg, props.data.status),
            )
            if (email instanceof Error) throw email
        } catch (error) {
            this.logger.error(
                `${typeof error}: ${JSON.stringify(error.message, null, 2)}`,
            )
        }
    }

    private montarMensagem(tfg: Tfg, statusTfg: string): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${tfg.getAluno().nome}</b>!</p>
                <p>O TFG foi avaliado pela banca com a nota <b><${tfg.getNotaFinal()}/b> e o seu trabalho foi <b>${statusTfg}</b></p>
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
