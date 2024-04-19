import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import { CodigoProfessorGeradoEvent } from '../../../core/domain/events/CodigoProfessorGerado.event'

@EventsHandler(CodigoProfessorGeradoEvent)
export class EnviarEmailCodigoProfessorGeradoHandler
    implements IEventHandler<CodigoProfessorGeradoEvent>
{
    private logger = new Logger(EnviarEmailCodigoProfessorGeradoHandler.name)

    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
    ) {}

    async handle(props: CodigoProfessorGeradoEvent): Promise<Error | void> {
        try {
            const email = await this.enviarEmailService.enviar(
                props.data.email,
                'SITFG - Código de professor gerado',
                this.montarMensagem(props.data.codigo),
                { urlFrontend: true },
            )
            if (email instanceof Error) throw email
        } catch (error) {
            this.logger.error(
                `${typeof error}: ${JSON.stringify(error.message, null, 2)}`,
            )
        }
    }

    private montarMensagem(codigo: string): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>professor</b>!</p>
                <p>Um administrador gerou um código de uso único para o seu cadastro no Sistema de Integração de TFGs do IMC</p>
                <br>
                <p>Código: <b>${codigo}</b></p>
                <br>
                <p>Para mais informações, acesse o sistema neste <a href="{urlFrontend}">link</a></p>
              </body>
            </html>
        `
    }
}
