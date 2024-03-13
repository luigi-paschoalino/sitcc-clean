import { EventsHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import { TfgNotaParcialAvaliadaEventProps } from '../../../core/domain/events/TfgNotaParcialAvaliada.event'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { Tfg } from '../../domain/Tfg'
import { TfgNotaParcialAvaliadaEvent } from '../../../core/domain/events/TfgNotaParcialAvaliada.event'

@EventsHandler(TfgNotaParcialAvaliadaEvent)
export class EnviarEmailTfgNotaParcialAvaliadaHandler {
    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        @Inject('BuscarTfgService')
        private readonly buscarTfgService: BuscarTfgService,
    ) {}

    async handle(
        props: TfgNotaParcialAvaliadaEventProps,
    ): Promise<Error | void> {
        try {
            const tfg = await this.buscarTfgService.buscar(props.id)
            if (tfg instanceof Error) throw tfg

            // Montando email para o aluno
            const email = await this.enviarEmailService.enviar(
                tfg.getAluno().email,
                'Avaliação parcial do TFG',
                this.montarMensagem(tfg),
            )
            if (email instanceof Error) throw email
        } catch (error) {
            return error
        }
    }

    // TODO: utilizar template do Handlebars
    private montarMensagem(tfg: Tfg): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${tfg.getAluno().nome}</b>!</p>
                <p>O TFG foi avaliado pelo seu orientador com a nota <b><${tfg.getNotaParcial()}/b> </p>
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
                <p>Para mais informações, acesse o sistema.</p>
              </body>
            </html>
        `
    }
}
