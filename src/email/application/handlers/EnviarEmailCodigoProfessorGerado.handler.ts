import { EventsHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import {
    CodigoProfessorGeradoEvent,
    CodigoProfessorGeradoEventProps,
} from '../../../core/domain/events/CodigoProfessorGerado.event'

@EventsHandler(CodigoProfessorGeradoEvent)
export class EnviarEmailCodigoProfessorGeradoHandler {
    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
        private readonly link: string,
    ) {}

    async handle(
        props: CodigoProfessorGeradoEventProps,
    ): Promise<Error | void> {
        try {
            const email = await this.enviarEmailService.enviar(
                props.email,
                'SITFG - Código de professor gerado',
                this.montarMensagem(props.codigo, this.link),
            )
            if (email instanceof Error) throw email
        } catch (error) {
            return error
        }
    }

    // TODO: utilizar template do Handlebars
    private montarMensagem(codigo: string, link: string): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>professor</b>!</p>
                <p>Um administrador gerou um código de uso único para o seu cadastro no Sistema de Integração de TFGs do IMC/b></p>
                <br><br>
                <p>Código: <b>${codigo}</b></p>
                  <br>
                <p>Para mais informações, acesse o sistema neste <a href="${link}">link</a></p>
              </body>
            </html>
        `
    }
}
