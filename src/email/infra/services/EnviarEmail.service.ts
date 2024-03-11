import { Logger } from '@nestjs/common'
import { ServiceException } from '../../../shared/domain/exceptions/Service.exception'
import { EnviarEmailService } from '../../domain/services/EnviarEmail.service'
import * as nodemailer from 'nodemailer'

export class EnviarEmailServiceImpl implements EnviarEmailService {
    private logger = new Logger(EnviarEmailServiceImpl.name)

    constructor(
        private readonly serviceEmail: string,
        private readonly servicePass: string,
    ) {}

    async enviar(destinatario: string, assunto: string, mensagem: string) {
        try {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: this.serviceEmail,
                    pass: this.servicePass,
                },
            })

            const mailOptions = {
                from: this.serviceEmail,
                to: destinatario,
                subject: assunto,
                html: mensagem,
            }

            const sendMail = await transport.sendMail(mailOptions)
            this.logger.log(JSON.stringify(sendMail, null, 2))
        } catch (error) {
            throw new ServiceException('Erro ao enviar email')
        }
    }
}
