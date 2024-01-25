import { Injectable } from '@nestjs/common'
import nodemailer from 'nodemailer'
import {
    EnviarEmailPorps,
    EnviarEmailService,
} from 'src/core/domain/services/EnviarEmail.service'

@Injectable()
export class EnviarEmailImpl implements EnviarEmailService {
    async enviar(props: EnviarEmailPorps) {
        // Configurações do transporte de e-mail
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'correioamparo53@outlook.com', // Email
                pass: '!Q2w3e4r5t6y7u8i9o0p', //Senha
            },
        })

        // Opções do e-mail
        const mailOptions = {
            from: 'correioamparo53@outlook.com',
            to: props.destinatario,
            subject: props.assunto, // Assunto
            text: props.corpo, //Corpo
        }

        // Enviar o e-mail
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Ocorreu um erro:', error)
            } else {
                console.log('E-mail enviado com sucesso!', info.response)
            }
        })
    }
}
