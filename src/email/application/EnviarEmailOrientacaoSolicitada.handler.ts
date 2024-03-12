import { EventsHandler } from '@nestjs/cqrs'
import {
    TfgCadastradoEvent,
    TfgCadastradoEventProps,
} from '../../core/domain/events/TfgCadastrado.event'
import { Inject } from '@nestjs/common'
import { EnviarEmailService } from '../domain/services/EnviarEmail.service'

@EventsHandler(TfgCadastradoEvent)
export class EnviarEmailOrientacaoSolicitadaHandler {
    constructor(
        @Inject('EnviarEmailService')
        private readonly enviarEmailService: EnviarEmailService,
    ) {}

    async handle(props: TfgCadastradoEventProps): Promise<Error | void> {
        try {
            // Montando email para o aluno
            const envioEmailAlunoPromise = this.enviarEmailService.enviar(
                props.alunoEmail,
                'A sua solicitação de TFG foi cadastrada com sucesso!',
                this.montarMensagemAluno(props),
            )

            // Montando email para o orientador
            const envioEmailOrientadorPromise = this.enviarEmailService.enviar(
                props.orientadorEmail,
                'Solicitação de orientação de TFG',
                this.montarMensagemOrientador(props),
            )

            // Montando email para o coorientador
            let envioEmailCoorientadorPromise: void | Promise<Error | void>
            if (props.coorientadorEmail) {
                envioEmailCoorientadorPromise = this.enviarEmailService.enviar(
                    props.coorientadorEmail,
                    'Solicitação de coorientação de TFG',
                    this.montarMensagemCoorientador(props),
                )
            }

            const [aluno, orientador, coorientador] = await Promise.all([
                envioEmailAlunoPromise,
                envioEmailOrientadorPromise,
                envioEmailCoorientadorPromise ?? Promise.resolve(),
            ])

            if (aluno instanceof Error) throw aluno
            if (orientador instanceof Error) throw orientador
            if (coorientador instanceof Error) throw coorientador
        } catch (error) {
            return error
        }
    }

    private montarMensagemAluno(props: TfgCadastradoEventProps): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${props.alunoNome}</b>!</p>
                <p>Seu Trabalho de Final de Graduação (TFG) "<b>${
                    props.titulo
                }</b>" foi cadastrado com sucesso. 
                <br><br>
                <p>Informações sobre o TFG:</p>
                <ul>
                  <li><b>Aluno:</b> ${props.alunoNome}</li>
                  <li><b>Orientador:</b> ${props.orientadorNome}</li>
                  <li><b>Coorientador:</b> ${
                      props.coorientadorNome ?? 'SEM COORIENTADOR'
                  }</li>
                  <br>
                <p>Estamos ansiosos para ver suas contribuições e desejamos sucesso em seu projeto!</p>
              </body>
            </html>
        `
    }

    private montarMensagemOrientador(props: TfgCadastradoEventProps): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${props.orientadorNome}</b>!</p>
                <p>O aluno <b>${props.alunoNome}</b> cadastrou o TFG "<b>${
            props.titulo
        }</b>" e o indicou como orientador. 
                <br><br>
                <p>Informações sobre o TFG:</p>
                <ul>
                  <li><b>Aluno:</b> ${props.alunoNome}</li>
                  <li><b>Orientador:</b> ${props.orientadorNome}</li>
                  <li><b>Coorientador:</b> ${
                      props.coorientadorNome ?? 'SEM COORIENTADOR'
                  }</li>
                  <br>
                <p>Faça login no Sistema Integrado de TFGs para aceitar/recusar a orientação</p>
              </body>
            </html>
        `
    }

    private montarMensagemCoorientador(props: TfgCadastradoEventProps): string {
        return `
            <html>
              <body>
                <p>Saudações, <b>${props.coorientadorNome}</b>!</p>
                <p>O aluno <b>${props.alunoNome}</b> cadastrou o TFG "<b>${props.titulo}</b>" e o indicou como coorientador. 
                <br><br>
                <p>Informações sobre o TFG:</p>
                <ul>
                  <li><b>Aluno:</b> ${props.alunoNome}</li>
                  <li><b>Orientador:</b> ${props.orientadorNome}</li>
                  <li><b>Coorientador:</b> ${props.coorientadorNome}</li>
                  <br>
                <p>Converse com o orientador indicado para discutirem a aceitação/recusa da orientação</p>
              </body>
            </html>
        `
    }
}
