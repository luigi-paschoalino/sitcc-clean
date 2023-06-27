import { AggregateRoot } from '@nestjs/cqrs'
import { TccCadastradoEvent } from './events/TccCadastrado.event'
import { Banca } from './Banca'
import { TIPO_USUARIO, Usuario } from './Usuario'

export enum STATUS_TCC {
    MATRICULA_REALIZADA = 'MATRICULA_REALIZADA',
    ORIENTACAO_ACEITA = 'ORIENTACAO_ACEITA',
    ORIENTACAO_RECUSADA = 'ORIENTACAO_RECUSADA',
}

export interface CriarTccProps {
    aluno: Usuario
    orientador: Usuario
    titulo: string
    palavras_chave: string[]
    introducao: string
    objetivos: string
    bibliografia: string
    metodologia: string
    resultados: string
}

export interface CarregarTccProps {
    aluno: string
    orientador: string
    titulo: string
    palavras_chave: string[]
    introducao: string
    objetivos: string
    bibliografia: string
    metodologia: string
    resultados: string
    status: STATUS_TCC
    nota_parcial: number
    nota_final: number
    banca?: Banca[]
}

export class Tcc extends AggregateRoot {
    private id: string
    private alunoId: string
    private orientadorId: string
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
    private banca?: Banca[]

    private constructor(id: string) {
        super()
        this.id = id
    }

    static criar(props: CriarTccProps, id: string): Error | Tcc {
        const tcc = new Tcc(id)

        tcc.setStatus(STATUS_TCC.MATRICULA_REALIZADA)
        tcc.setTitulo(props.titulo)
        tcc.setPalavrasChave(props.palavras_chave)
        tcc.setIntroducao(props.introducao)
        tcc.setObjetivos(props.objetivos)
        tcc.setBibliografia(props.bibliografia)
        tcc.setMetodologia(props.metodologia)
        tcc.setResultados(props.resultados)

        tcc.setAluno(props.aluno)
        tcc.setOrientador(props.orientador)

        tcc.apply(
            new TccCadastradoEvent({
                id: tcc.id,
                titulo: tcc.titulo,
            }),
        )
        return tcc
    }

    static carregar(props: CarregarTccProps, id: string): Tcc {
        const tcc = new Tcc(id)

        tcc.status = props.status
        tcc.titulo = props.titulo
        tcc.palavras_chave = props.palavras_chave
        tcc.introducao = props.introducao
        tcc.objetivos = props.objetivos
        tcc.bibliografia = props.bibliografia
        tcc.metodologia = props.metodologia
        tcc.resultados = props.resultados
        tcc.nota_parcial = props.nota_parcial
        tcc.nota_final = props.nota_final
        tcc.banca = props.banca

        tcc.alunoId = props.aluno
        tcc.orientadorId = props.orientador

        return tcc
    }

    public getId(): string {
        return this.id
    }

    public getAluno(): string {
        return this.alunoId
    }

    public getOrientador(): string {
        return this.orientadorId
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

    private setTitulo(titulo: string): void {
        this.titulo = titulo
    }

    private setPalavrasChave(palavras_chave: string[]): void {
        this.palavras_chave = palavras_chave
    }

    private setIntroducao(introducao: string): void {
        this.introducao = introducao
    }

    private setObjetivos(objetivos: string): void {
        this.objetivos = objetivos
    }

    private setBibliografia(bibliografia: string): void {
        this.bibliografia = bibliografia
    }

    private setMetodologia(metodologia: string): void {
        this.metodologia = metodologia
    }

    private setResultados(resultados: string): void {
        this.resultados = resultados
    }

    private setAluno(aluno: Usuario): Error | void {
        if (!aluno) {
            throw new Error('Aluno não informado')
        }

        if (aluno.getTipo() !== TIPO_USUARIO.ALUNO) {
            throw new Error('Usuário informado não é um aluno')
        }

        this.alunoId = aluno.getId()
    }

    private setOrientador(orientador: Usuario): Error | void {
        if (!orientador) {
            throw new Error('Orientador não informado')
        }

        if (orientador.getTipo() !== TIPO_USUARIO.PROFESSOR) {
            throw new Error('Usuário informado não é um orientador')
        }

        this.orientadorId = orientador.getId()
    }

    private setNotaParcial(nota_parcial: number): void {
        this.nota_parcial = nota_parcial
    }

    private setNotaFinal(nota_final: number): void {
        this.nota_final = nota_final
    }

    // TODO: adicionar evento TccBancaAtribuidaEvent
    public atribuirBanca(banca: Banca): void {
        this.banca.push(banca)
    }

    public aceitarOrientacao(): void {
        this.setStatus(STATUS_TCC.ORIENTACAO_ACEITA)
    }

    public recusarOrientacao(): void {
        this.setStatus(STATUS_TCC.ORIENTACAO_RECUSADA)
    }
}
