import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import { SenhaReiniciadaEvent } from '../../../core/domain/events/SenhaReiniciada.event'

@EventsHandler(SenhaReiniciadaEvent)
export class EnviarEmailRecuperarSenhaHandler
    implements IEventHandler<SenhaReiniciadaEvent>
{
    private logger = new Logger(EnviarEmailRecuperarSenhaHandler.name)

    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
    ) {}

    async handle(props: SenhaReiniciadaEvent): Promise<Error | void> {
        try {
            const email = await this.enviarEmailService.enviar(
                props.data.email,
                'SITFG - Solicitação de recuperação de senha',
                this.montarMensagem(props.data.hash),
                { urlFrontend: true },
            )
            if (email instanceof Error) throw email
        } catch (error) {
            this.logger.error(
                `${typeof error}: ${JSON.stringify(error.message, null, 2)}`,
            )
        }
    }

    private montarMensagem(hash: string): string {
        return `
            <html>
              <body>
                <p>Saudações!</p>
                <p>Foi solicitada uma reinicialização da senha vinculada à sua conta do Sistema de Integração de TFGs do IMC</p>
                <br>
                <p>Acesse o seguinte <a href="{urlFrontend}/senha/${hash}">link</a> para cadastrar sua nova senha</p>
                <br>
                <p>Caso não tenha sido você, ignore este e-mail</p>
              </body>
            </html>
        `
    }
}
