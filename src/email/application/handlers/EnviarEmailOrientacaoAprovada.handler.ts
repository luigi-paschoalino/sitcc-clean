import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import { TfgOrientacaoAprovadaEvent } from '../../../core/domain/events/TfgOrientacaoAprovada.event'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { Tfg } from '../../domain/Tfg'

@EventsHandler(TfgOrientacaoAprovadaEvent)
export class EnviarEmailOrientacaoAprovadaHandler
    implements IEventHandler<TfgOrientacaoAprovadaEvent>
{
    private logger = new Logger(EnviarEmailOrientacaoAprovadaHandler.name)

    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        @Inject('BuscarTfgService')
        private readonly buscarTfgService: BuscarTfgService,
    ) {}

    async handle(props: TfgOrientacaoAprovadaEvent): Promise<Error | void> {
        try {
            const tfg = await this.buscarTfgService.buscar(props.data.id)
            if (tfg instanceof Error) throw tfg

            const aluno = await this.enviarEmailService.enviar(
                tfg.getAluno().email,
                'A sua solicitação de TFG foi cadastrada com sucesso!',
                this.montarMensagem(tfg),
            )
            if (aluno instanceof Error) throw aluno
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
                <p>A sua solicitação de orientação de TFG foi aprovada com sucesso!</p>
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
                <p>Estamos ansiosos para ver suas contribuições e desejamos sucesso em seu projeto!</p>
              </body>
            </html>
        `
    }
}
