export type ConfigProps = {
    urlFrontend: boolean
}

export interface EnviarEmailService {
    enviar(
        destinatario: string,
        assunto: string,
        mensagem: string,
        config?: ConfigProps,
    ): Promise<Error | void>
}
