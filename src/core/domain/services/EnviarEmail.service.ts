export interface EnviarEmailPorps {
    destinatario: string
    assunto: string
    corpo: string
}
export interface EnviarEmailService {
    enviar(props: EnviarEmailPorps): Promise<Error | void>
}
