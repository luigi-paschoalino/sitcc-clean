import { Apresentacao } from './Apresentacao'

export enum STATUS_TCC {
    MATRICULA_REALIZADA = 'MATRICULA_REALIZADA',
    ORIENTACAO_ACEITA = 'ORIENTACAO_ACEITA',
    ORIENTACAO_RECUSADA = 'ORIENTACAO_RECUSADA',
}

export class Tcc {
    private id: string
    private status: STATUS_TCC
    private apresentacao: Apresentacao
    private nota_parcial: number
    private nota_final: number

    private constructor() {}

    static criar(): Tcc {
        const tcc = new Tcc()
        tcc.setStatus(STATUS_TCC.MATRICULA_REALIZADA)
        return tcc
    }

    public getId(): string {
        return this.id
    }

    public getStatus(): STATUS_TCC {
        return this.status
    }

    public getApresentacao(): Apresentacao {
        return this.apresentacao
    }

    public getNotaParcial(): number {
        return this.nota_parcial
    }

    public getNotaFinal(): number {
        return this.nota_final
    }

    private setStatus(status: STATUS_TCC): void {
        this.status = status
    }

    private setApresentacao(apresentacao: Apresentacao): void {
        this.apresentacao = apresentacao
    }

    public atualizarApresentacao(apresentacao: Apresentacao): void {
        // TODO: inserir validações dos campos de apresentação
        this.setApresentacao(apresentacao)
    }
}
