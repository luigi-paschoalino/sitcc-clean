import { AggregateRoot } from '@nestjs/cqrs'
import { TfgCadastradoEvent } from './events/TfgCadastrado.event'
import { Banca } from './Banca'
import { TIPO_USUARIO, Usuario } from './Usuario'
import { UsuarioException } from './exceptions/Usuario.exception'
import { TfgOrientacaoAprovadaEvent } from './events/TfgOrientacaoAprovada.event'
import { TfgOrientacaoReprovadaEvent } from './events/TfgOrientacaoReprovada.event'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { TfgNotaParcialAvaliadaEvent } from './events/TfgNotaParcialAvaliada.event'
import { TfgNotaFinalAvaliadaEvent } from './events/TfgNotaFinalEvent.event'
import { BancaAdicionadaEvent } from './events/BancaAdicionada.event'
import { TfgEnviadoEvent } from './events/TfgEnviado.event'
import { TIPO_ENTREGA } from './services/MoverTfg.service'

export enum STATUS_TFG {
    MATRICULA_REALIZADA = 'MATRICULA_REALIZADA',
    ORIENTACAO_ACEITA = 'ORIENTACAO_ACEITA',
    ORIENTACAO_RECUSADA = 'ORIENTACAO_RECUSADA',
    ENTREGA_PARCIAL = 'ENTREGA_PARCIAL',
    ENTREGA_FINAL = 'ENTREGA_FINAL',
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO',
}

export interface CriarTfgProps {
    aluno: Usuario
    orientador: Usuario
    coorientador?: Usuario
    titulo?: string
    palavrasChave?: string
    introducao?: string
    objetivos?: string
    bibliografia?: string
    metodologia?: string
    resultados?: string
}

export interface CarregarTfgProps {
    aluno: string
    orientador: string
    coorientador?: string
    titulo?: string
    palavrasChave?: string
    introducao?: string
    objetivos?: string
    bibliografia?: string
    metodologia?: string
    resultados?: string
    status?: STATUS_TFG
    notaParcial?: number
    notaFinal?: number
    banca?: Banca[]
    path?: string
}

export class Tfg extends AggregateRoot {
    private id: string
    private alunoId: string
    private orientadorId: string
    private coorientadorId?: string
    private status: STATUS_TFG
    private titulo?: string
    private palavrasChave?: string
    private introducao?: string
    private objetivos?: string
    private bibliografia?: string
    private metodologia?: string
    private resultados?: string
    private notaParcial?: number
    private notaFinal?: number
    private banca?: Banca[]
    private path?: string

    private constructor(id: string) {
        super()
        this.id = id
    }

    static criar(props: CriarTfgProps, id: string): Error | Tfg {
        const tcc = new Tfg(id)

        tcc.setStatus(STATUS_TFG.MATRICULA_REALIZADA)
        tcc.setAluno(props.aluno)
        tcc.setOrientador(props.orientador)
        tcc.setCoorientador(props.coorientador)

        tcc.apply(
            new TfgCadastradoEvent({
                id: tcc.id,
                titulo: tcc.titulo,
            }),
        )
        return tcc
    }

    static carregar(props: CarregarTfgProps, id: string): Tfg {
        const tcc = new Tfg(id)

        tcc.status = props.status
        tcc.titulo = props.titulo
        tcc.palavrasChave = props.palavrasChave
        tcc.introducao = props.introducao
        tcc.objetivos = props.objetivos
        tcc.bibliografia = props.bibliografia
        tcc.metodologia = props.metodologia
        tcc.resultados = props.resultados
        tcc.notaParcial = props.notaParcial
        tcc.notaFinal = props.notaFinal
        tcc.banca = props.banca
        tcc.path = props.path

        tcc.alunoId = props.aluno
        tcc.orientadorId = props.orientador
        tcc.coorientadorId = props.coorientador

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

    public getCoorientador(): string | null {
        return this.coorientadorId
    }

    public getStatus(): STATUS_TFG {
        return this.status
    }

    public getTitulo(): string {
        return this.titulo
    }

    public getPalavrasChave(): string {
        return this.palavrasChave
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
        return this.notaParcial
    }

    public getNotaFinal(): number {
        return this.notaFinal
    }

    public getBanca(): Banca[] {
        return this.banca
    }

    public getPath(): string {
        return this.path
    }

    private setStatus(status: STATUS_TFG): void {
        this.status = status
    }

    private setTitulo(titulo: string): void {
        this.titulo = titulo
    }

    private setPalavrasChave(palavrasChave: string): void {
        this.palavrasChave = palavrasChave
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
            throw new Error('Usuário informado não é um professor')
        }

        this.orientadorId = orientador.getId()
    }

    private setCoorientador(coorientador: Usuario): Error | void {
        if (!coorientador) {
            this.coorientadorId = null
            return
        }
        if (coorientador.getTipo() !== TIPO_USUARIO.PROFESSOR) {
            throw new Error('Usuário informado não é um professor')
        }

        this.coorientadorId = coorientador.getId()
    }

    private setNotaParcial(nota_parcial: number): void {
        if (!nota_parcial) {
            throw new Error('Nota não informada')
        }

        if (nota_parcial < 0 || nota_parcial > 10) {
            throw new Error('Nota deve ser entre 0 e 10')
        }

        this.notaParcial = nota_parcial
    }
    private setNotaFinal(notaFinal: number): void {
        if (!notaFinal) {
            throw new Error('Nota não informada')
        }

        if (notaFinal < 0 || notaFinal > 10) {
            throw new Error('Nota deve ser entre 0 e 10')
        }

        this.notaFinal = notaFinal
    }

    // TODO: adicionar evento TccBancaAtribuidaEvent
    public atribuirBanca(banca: Banca): void {
        try {
            if (!this.banca) this.banca = []

            if (
                this.banca.find(
                    (b) => b.getProfessorId() === banca.getProfessorId(),
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
            this.setStatus(STATUS_TFG.ORIENTACAO_ACEITA)
            this.apply(
                new TfgOrientacaoAprovadaEvent({
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
            this.setStatus(STATUS_TFG.ORIENTACAO_RECUSADA)
            this.apply(
                new TfgOrientacaoReprovadaEvent({
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

        this.setNotaParcial(nota)

        new TfgNotaParcialAvaliadaEvent({
            tccId: this.id,
            nota: nota,
        })
    }

    public avaliarNotaFinalBanca(
        professorId: string,
        notaApresentacao: number,
        notaTrabalho: number,
    ): Error | void {
        const banca = this.banca.find((b) => b.getProfessorId() === professorId)

        if (!banca)
            throw new UsuarioException(
                'Professor informado não possui registro na banca deste TCC',
            )

        banca.avaliarNotaTcc(notaApresentacao, notaTrabalho)

        new TfgNotaFinalAvaliadaEvent({
            bancaId: banca.getId(),
            tfgId: this.id,
        })
    }

    public enviarTfg(path: string, tipoEntrega: TIPO_ENTREGA): Error | void {
        if (!path.trim()) {
            throw new Error('Caminho do arquivo não informado')
        }

        this.path = path
        this.setStatus(STATUS_TFG.ENTREGA_PARCIAL)

        this.apply(
            new TfgEnviadoEvent({
                tfgId: this.id,
                path: path,
                tipoEntrega,
            }),
        )
    }

    public toDTO() {
        return {
            id: this.id,
            aluno: this.alunoId,
            orientador: this.orientadorId,
            coorientador: this.coorientadorId,
            status: this.status,
            titulo: this.titulo,
            palavrasChave: this.palavrasChave,
            introducao: this.introducao,
            objetivos: this.objetivos,
            bibliografia: this.bibliografia,
            metodologia: this.metodologia,
            resultados: this.resultados,
            notaParcial: this.notaParcial,
            notaFinal: this.notaFinal,
            banca: this.banca,
            path: this.path,
        }
    }
}
