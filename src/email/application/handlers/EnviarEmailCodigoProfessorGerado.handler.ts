import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import { CodigoProfessorGeradoEvent } from '../../../core/domain/events/CodigoProfessorGerado.event'

@EventsHandler(CodigoProfessorGeradoEvent)
export class EnviarEmailCodigoProfessorGeradoHandler
    implements IEventHandler<CodigoProfessorGeradoEvent>
{
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
            )
            if (email instanceof Error) throw email
        } catch (error) {
            return error
        }
    }

    // TODO: utilizar template do Handlebars
    // TODO: rever como adicionar o link para o sistema
    private montarMensagem(codigo: string): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>professor</b>!</p>
                <p>Um administrador gerou um código de uso único para o seu cadastro no Sistema de Integração de TFGs do IMC</p>
                <br>
                <p>Código: <b>${codigo}</b></p>
                <br>
                <p>Para mais informações, acesse o sistema neste <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">link</a></p>
              </body>
            </html>
        `
    }
}
