import { AggregateRoot } from '@nestjs/cqrs'
import { TccCadastradoEvent } from './events/TccCadastrado.event'
import { Banca } from './Banca'
import { TIPO_USUARIO, Usuario } from './Usuario'
import { UsuarioException } from './exceptions/Usuario.exception'
import { TccOrientacaoAprovadaEvent } from './events/TccOrientacaoAprovada.event'
import { TccOrientacaoReprovadaEvent } from './events/TccOrientacaoReprovada.event'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { TccNotaParcialAvaliadaEvent } from './events/TccNotaParcialAvaliada.event'
import { TccNotaFinalAvaliadaEvent } from './events/TccNotaFinalEvent.event'
import { BancaAdicionadaEvent } from './events/BancaAdicionada.event'
import { TccEnviadoEvent } from './events/TccEnviado.event'
import { TIPO_ENTREGA } from './services/MoverTcc.service'

export enum STATUS_TCC {
    MATRICULA_REALIZADA = 'MATRICULA_REALIZADA',
    ORIENTACAO_ACEITA = 'ORIENTACAO_ACEITA',
    ORIENTACAO_RECUSADA = 'ORIENTACAO_RECUSADA',
    ENTREGA_PARCIAL = 'ENTREGA_PARCIAL',
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
    path?: string
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
    private path?: string

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
        tcc.path = props.path

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

    public getBanca(): Banca[] {
        return this.banca
    }

    public getPath(): string {
        return this.path
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
        try {
            if (!this.banca) this.banca = []

            if (
                this.banca.find(
                    (b) => b.getIdProfessor() === banca.getIdProfessor(),
                )
            )
                throw new UsuarioException(
                    'Este professor já esta avaliando este TCC',
                )

            this.banca.push(banca)

            this.apply(
                new BancaAdicionadaEvent({
                    tccId: this.id,
                    bancaId: banca.getId(),
                }),
            )
        } catch (error) {
            return error
        }
    }

    public avaliarOrientacao(
        professorId: string,
        status: boolean,
        justificativa?: string,
    ): Error | void {
        if (professorId !== this.orientadorId)
            throw new UsuarioException(
                'O professor que está avaliando não é orientador deste TCC',
            )

        if (status) {
            if (justificativa?.trim())
                throw new InvalidPropsException(
                    'A justificativa não deve ser informada em caso de aprovação',
                )
            this.setStatus(STATUS_TCC.ORIENTACAO_ACEITA)
            this.apply(
                new TccOrientacaoAprovadaEvent({
                    id: this.id,
                    alunoId: this.alunoId,
                    orientadorId: this.orientadorId,
                }),
            )
        } else {
            if (!justificativa?.trim())
                throw new InvalidPropsException(
                    'A justificativa deve ser informada em caso de reprovação',
                )
            this.setStatus(STATUS_TCC.ORIENTACAO_RECUSADA)
            this.apply(
                new TccOrientacaoReprovadaEvent({
                    id: this.id,
                    alunoId: this.alunoId,
                    orientadorId: this.orientadorId,
                    justificativa: justificativa,
                }),
            )
        }
    }

    public avaliarNotaParcial(professorId: string, nota: number): Error | void {
        if (professorId !== this.orientadorId)
            throw new UsuarioException(
                'O professor que está avaliando não é orientador deste TCC',
            )

        if (!nota) {
            throw new Error('Nota não informada')
        }

        if (nota < 0 || nota > 10) {
            throw new Error('Nota deve ser entre 0 e 10')
        }

        this.nota_parcial = nota
        new TccNotaParcialAvaliadaEvent({
            tccId: this.id,
            nota: nota,
        })
    }

    public avaliarNotaFinal(professorId: string, nota: number): Error | void {
        if (professorId !== this.orientadorId)
            throw new UsuarioException(
                'O professor que está avaliando não é orientador deste TCC',
            )

        if (!nota) {
            throw new Error('Nota não informada')
        }

        if (nota < 0 || nota > 10) {
            throw new Error('Nota deve ser entre 0 e 10')
        }

        this.nota_final = nota
        new TccNotaFinalAvaliadaEvent({
            tccId: this.id,
            nota: nota,
        })
    }

    public enviarTcc(path: string, tipoEntrega: TIPO_ENTREGA): Error | void {
        if (!path.trim()) {
            throw new Error('Caminho do arquivo não informado')
        }

        this.path = path
        this.setStatus(STATUS_TCC.ENTREGA_PARCIAL)

        this.apply(
            new TccEnviadoEvent({
                tccId: this.id,
                path: path,
                tipoEntrega,
            }),
        )
    }
}
