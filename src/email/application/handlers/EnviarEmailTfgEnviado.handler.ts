import { EventsHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import { TfgEnviadoEventProps } from '../../../core/domain/events/TfgEnviado.event'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { Tfg } from '../../domain/Tfg'
import { TfgEnviadoEvent } from '../../../core/domain/events/TfgEnviado.event'

@EventsHandler(TfgEnviadoEvent)
export class EnviarEmailTfgEnviadoHandler {
    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        @Inject('BuscarTfgService')
        private readonly buscarTfgService: BuscarTfgService,
    ) {}

    async handle(props: TfgEnviadoEventProps): Promise<Error | void> {
        try {
            const tfg = await this.buscarTfgService.buscar(props.id)
            if (tfg instanceof Error) throw tfg

            // Montando email para o orientador
            const emailOrientador = await this.enviarEmailService.enviar(
                tfg.getOrientador().email,
                'Entrega de TFG registrada no sistema',
                this.montarMensagem(tfg, props, false),
            )
            if (emailOrientador instanceof Error) throw emailOrientador

            // Montando email para o coorientador
            const emailCoorientador = await this.enviarEmailService.enviar(
                tfg.getCoorientador().email,
                'Entrega de TFG registrada no sistema',
                this.montarMensagem(tfg, props, true),
            )
            if (emailCoorientador instanceof Error) throw emailCoorientador
        } catch (error) {
            return error
        }
    }

    // TODO: utilizar template do Handlebars
    private montarMensagem(
        tfg: Tfg,
        props: TfgEnviadoEventProps,
        coorientador: boolean,
    ): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${
                    coorientador
                        ? tfg.getCoorientador().nome
                        : tfg.getOrientador().nome
                }</b>!</p>
                <p>Foi realizada a entrega ${props.tipoEntrega.toLocaleLowerCase()} do TFG de um dos seus orientandos!</p>
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
