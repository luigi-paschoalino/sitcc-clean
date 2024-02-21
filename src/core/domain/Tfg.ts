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
import { TfgException } from './exceptions/Tfg.exception'

export enum STATUS_TFG {
    MATRICULA_REALIZADA = 'MATRICULA_REALIZADA',
    ORIENTACAO_ACEITA = 'ORIENTACAO_ACEITA',
    ORIENTACAO_RECUSADA = 'ORIENTACAO_RECUSADA',
    ENTREGA_PARCIAL = 'ENTREGA_PARCIAL',
    ENTREGA_FINAL = 'ENTREGA_FINAL',
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO',
}

export enum TIPO_ENTREGA {
    PARCIAL = 'PARCIAL',
    FINAL = 'FINAL',
}

export interface CriarTfgProps {
    aluno: Usuario
    orientador: Usuario
    coorientador?: Usuario
    titulo: string
    palavrasChave: string
    introducao: string
    objetivos: string
    bibliografia: string
    metodoPesquisa: string
    tecnicaPesquisa: string
    descricaoMetodologia: string
    resultadosEsperados: string
}

export interface CarregarTfgProps {
    aluno: string
    orientador: string
    coorientador?: string
    titulo: string
    palavrasChave: string
    introducao: string
    objetivos: string
    bibliografia: string
    metodoPesquisa: string
    tecnicaPesquisa: string
    descricaoMetodologia: string
    resultadosEsperados: string
    status: STATUS_TFG
    notaParcial?: number
    notaFinal?: number
    banca?: Banca
    pathParcial?: string
    pathFinal?: string
}

export class Tfg extends AggregateRoot {
    private id: string
    private alunoId: string
    private orientadorId: string
    private coorientadorId?: string
    private status: STATUS_TFG
    private titulo: string
    private palavrasChave: string
    private introducao: string
    private objetivos: string
    private bibliografia: string
    private metodoPesquisa: string
    private tecnicaPesquisa: string
    private descricaoMetodologia: string
    private resultadosEsperados: string
    private notaParcial?: number
    private notaFinal?: number
    private banca?: Banca
    private pathParcial?: string
    private pathFinal?: string

    private constructor(id: string) {
        super()
        this.id = id
    }

    static criar(props: CriarTfgProps, id: string): Error | Tfg {
        const tfg = new Tfg(id)

        if (props.coorientador && props.coorientador === props.orientador)
            throw new InvalidPropsException(
                'O coorientador não pode ser o mesmo que o orientador',
            )

        tfg.setStatus(STATUS_TFG.MATRICULA_REALIZADA)
        tfg.setAluno(props.aluno)
        tfg.setOrientador(props.orientador)
        tfg.setCoorientador(props.coorientador)
        tfg.setTitulo(props.titulo)
        tfg.setPalavrasChave(props.palavrasChave)
        tfg.setIntroducao(props.introducao)
        tfg.setObjetivos(props.objetivos)
        tfg.setBibliografia(props.bibliografia)
        tfg.setMetodoPesquisa(props.metodoPesquisa)
        tfg.setTecnicaPesquisa(props.tecnicaPesquisa)
        tfg.setDescricaoMetodologia(props.descricaoMetodologia)
        tfg.setResultados(props.resultadosEsperados)

        tfg.apply(
            new TfgCadastradoEvent({
                id: tfg.id,
                titulo: tfg.titulo,
            }),
        )
        return tfg
    }

    static carregar(props: CarregarTfgProps, id: string): Tfg {
        const tfg = new Tfg(id)

        tfg.status = props.status
        tfg.titulo = props.titulo
        tfg.palavrasChave = props.palavrasChave
        tfg.introducao = props.introducao
        tfg.objetivos = props.objetivos
        tfg.bibliografia = props.bibliografia
        tfg.metodoPesquisa = props.metodoPesquisa
        tfg.tecnicaPesquisa = props.tecnicaPesquisa
        tfg.descricaoMetodologia = props.descricaoMetodologia
        tfg.resultadosEsperados = props.resultadosEsperados
        tfg.notaParcial = props.notaParcial
        tfg.notaFinal = props.notaFinal
        tfg.banca = props.banca
        tfg.pathParcial = props.pathParcial
        tfg.pathFinal = props.pathFinal

        tfg.alunoId = props.aluno
        tfg.orientadorId = props.orientador
        tfg.coorientadorId = props.coorientador

        return tfg
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

    public getMetodoPesquisa(): string {
        return this.metodoPesquisa
    }

    public getTecnicaPesquisa(): string {
        return this.tecnicaPesquisa
    }

    public getDescricaoMetodologia(): string {
        return this.descricaoMetodologia
    }

    public getResultados(): string {
        return this.resultadosEsperados
    }

    public getNotaParcial(): number {
        return this.notaParcial
    }

    public getNotaFinal(): number {
        return this.notaFinal
    }

    public getBanca(): Banca {
        return this.banca
    }

    public getPathParcial(): string {
        return this.pathParcial
    }

    public getPathFinal(): string {
        return this.pathFinal
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

    private setMetodoPesquisa(metodo: string): void {
        this.metodoPesquisa = metodo
    }

    private setTecnicaPesquisa(tecnica: string): void {
        this.tecnicaPesquisa = tecnica
    }

    private setDescricaoMetodologia(descricao: string): void {
        this.descricaoMetodologia = descricao
    }

    private setResultados(resultados: string): void {
        this.resultadosEsperados = resultados
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

    // TODO: evento para caso a nota seja menor que 6
    private setNotaParcial(nota_parcial: number): void {
        if (!nota_parcial) {
            throw new Error('Nota não informada')
        }

        if (nota_parcial < 0 || nota_parcial > 10) {
            throw new Error('Nota deve ser entre 0 e 10')
        }

        this.notaParcial = nota_parcial
    }

    public atribuirBanca(banca: Banca): void {
        try {
            if (this.banca)
                throw new UsuarioException(
                    'A banca já foi atribuída a este TFG',
                )

            this.banca = banca

            this.apply(
                new BancaAdicionadaEvent({
                    tfgId: this.id,
                    bancaId: banca.getId(),
                }),
            )
        } catch (error) {
            return error
        }
    }
    // TODO: comando para editar banca

    public avaliarOrientacao(
        professorId: string,
        status: boolean,
        justificativa?: string,
    ): Error | void {
        if (professorId !== this.orientadorId)
            throw new UsuarioException(
                'O professor que está avaliando não é orientador deste TFG',
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
                'O professor que está avaliando não é orientador deste TFG',
            )

        this.setNotaParcial(nota)

        new TfgNotaParcialAvaliadaEvent({
            tfgId: this.id,
            nota: nota,
        })
    }

    public avaliarNotaFinalBanca(
        professorId: string,
        notaApresentacao: number,
        notaTrabalho: number,
    ): Error | void {
        if (!this.banca)
            throw new TfgException('A banca deste TFG ainda não foi atribuída')

        if (
            ![
                this.banca.getProfessorId(),
                this.banca.getSegundoProfessorId(),
            ].includes(professorId)
        )
            throw new UsuarioException(
                'O professor que está avaliando não faz parte da banca deste TFG',
            )

        this.banca.avaliarNotaTfg(professorId, notaApresentacao, notaTrabalho)

        new TfgNotaFinalAvaliadaEvent({
            tfgId: this.id,
        })
    }

    public calcularNotaFinal(): Error | void {
        if (!this.banca)
            throw new TfgException('A banca deste TFG ainda não foi atribuída')

        if (
            !this.banca.getNotaApresentacaoProfessor() ||
            !this.banca.getNotaApresentacaoSegundoProfessor() ||
            !this.banca.getNotaTrabalhoProfessor() ||
            !this.banca.getNotaTrabalhoSegundoProfessor()
        )
            throw new TfgException(
                'A nota final não pode ser calculada sem que todas as notas da banca estejam atribuídas',
            )

        this.notaFinal =
            0.3 *
                ((this.banca.getNotaApresentacaoProfessor() +
                    this.banca.getNotaApresentacaoSegundoProfessor()) /
                    2) +
            0.7 *
                ((this.banca.getNotaTrabalhoProfessor() +
                    this.banca.getNotaTrabalhoSegundoProfessor()) /
                    2)
    }

    public enviarTfg(path: string, tipoEntrega: TIPO_ENTREGA): Error | void {
        if (!path.trim()) {
            throw new Error('Caminho do arquivo não informado')
        }

        tipoEntrega === TIPO_ENTREGA.PARCIAL
            ? (this.pathParcial = path)
            : (this.pathFinal = path)
        this.setStatus(
            tipoEntrega === TIPO_ENTREGA.PARCIAL
                ? STATUS_TFG.ENTREGA_PARCIAL
                : STATUS_TFG.ENTREGA_FINAL,
        )

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
            metodoPesquisa: this.metodoPesquisa,
            tecnicaPesquisa: this.tecnicaPesquisa,
            descricaoMetodologia: this.descricaoMetodologia,
            resultados: this.resultadosEsperados,
            notaParcial: this.notaParcial,
            notaFinal: this.notaFinal,
            banca: this.banca,
            pathParcial: this.pathParcial,
            pathFinal: this.pathFinal,
        }
    }
}
