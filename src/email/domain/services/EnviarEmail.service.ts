export interface EnviarEmailService {
    enviar(
        destinatario: string,
        assunto: string,
        mensagem: string,
    ): Promise<Error | void>
}
