import { Logger } from '@nestjs/common'
import { ServiceException } from '../../../shared/domain/exceptions/Service.exception'
import {
    ConfigProps,
    EnviarEmailService,
} from '../../domain/services/EnviarEmail.service'
import * as nodemailer from 'nodemailer'
import mailgunTransport from 'nodemailer-mailgun-transport'

export class EnviarEmailServiceImpl implements EnviarEmailService {
    private logger = new Logger(EnviarEmailServiceImpl.name)

    constructor(
        private readonly serviceEmail: string,
        private readonly apiKey: string,
        private readonly domain: string,
        private readonly urlFrontend: string,
    ) {}

    async enviar(
        destinatario: string,
        assunto: string,
        mensagem: string,
        config: ConfigProps = {
            urlFrontend: false,
        },
    ): Promise<ServiceException | void> {
        try {
            const mailgunOptions = {
                auth: {
                    api_key: this.apiKey,
                    domain: this.domain,
                },
            }

            const transporter = nodemailer.createTransport(
                mailgunTransport(mailgunOptions),
            )

            // TODO: verificar se há como adicionar nome personalizado no remetente
            transporter.sendMail(
                {
                    from: this.serviceEmail,
                    to: destinatario,
                    subject: assunto,
                    html: config.urlFrontend
                        ? mensagem.replace('{urlFrontend}', this.urlFrontend)
                        : mensagem,
                },
                (err, info) => {
                    if (err) {
                        throw new ServiceException(
                            `Erro ao enviar email:\n${err}`,
                        )
                    }
                    this.logger.log(info)
                },
            )
        } catch (error) {
            return new ServiceException('Erro ao enviar email')
        }
    }
}
