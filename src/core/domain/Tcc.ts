import { AggregateRoot } from '@nestjs/cqrs'

export enum STATUS_TCC {
    MATRICULA_REALIZADA = 'MATRICULA_REALIZADA',
    ORIENTACAO_ACEITA = 'ORIENTACAO_ACEITA',
    ORIENTACAO_RECUSADA = 'ORIENTACAO_RECUSADA',
}

export class Tcc extends AggregateRoot {
    private id: string
    private status: STATUS_TCC
    private titulo: string
    private palavras_chave: string[]
    private introducao: string
    private objetivos: string
    private bibliografia: string
    private metodologia: string
    private resultados: string
    private nota_parcial: number
    private nota_final: number

    private constructor() {
        super()
    }

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

    public getTitulo(): string {
        return this.titulo
    }

    public getPalavrasChave(): string[] {
        return this.palavras_chave
    }

    public getIntroducao(): string {
        return this.introducao
    }

    public getObjetivos(): string {
        return this.objetivos
    }

    public getBibliografia(): string {
        return this.bibliografia
    }

    public getMetodologia(): string {
        return this.metodologia
    }

    public getResultados(): string {
        return this.resultados
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

    public setTitulo(titulo: string): void {
        this.titulo = titulo
    }

    public setPalavrasChave(palavras_chave: string[]): void {
        this.palavras_chave = palavras_chave
    }

    public setIntroducao(introducao: string): void {
        this.introducao = introducao
    }

    public setObjetivos(objetivos: string): void {
        this.objetivos = objetivos
    }

    public setBibliografia(bibliografia: string): void {
        this.bibliografia = bibliografia
    }

    public setMetodologia(metodologia: string): void {
        this.metodologia = metodologia
    }

    public setResultados(resultados: string): void {
        this.resultados = resultados
    }
}
