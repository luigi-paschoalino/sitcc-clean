import { AbstractAggregateRoot } from '../../shared/domain/AbstractAggregateRoot'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'
import { TfgException } from '../../shared/domain/exceptions/Tfg.exception'
import { UsuarioException } from '../../shared/domain/exceptions/Usuario.exception'
import { Banca } from './Banca'
import { TIPO_USUARIO, Usuario } from './Usuario'
import { BancaAdicionadaEvent } from './events/BancaAdicionada.event'
import { BancaEditadaEvent } from './events/BancaEditada.event'
import { TfgCadastradoEvent } from './events/TfgCadastrado.event'
import { TfgEnviadoEvent } from './events/TfgEnviado.event'
import { TfgNotaFinalAvaliadaEvent } from './events/TfgNotaFinalAvaliada.event'
import { TfgNotaParcialAvaliadaEvent } from './events/TfgNotaParcialAvaliada.event'
import { TfgOrientacaoAprovadaEvent } from './events/TfgOrientacaoAprovada.event'
import { TfgOrientacaoRecusadaEvent } from './events/TfgOrientacaoRecusada.event'

export enum STATUS_TFG {
    MATRICULA_REALIZADA = 'MATRICULA_REALIZADA', // Aluno matriculado e TFG cadastrado
    ORIENTACAO_ACEITA = 'ORIENTACAO_ACEITA', // Orientação aceita pelo orientador
    ORIENTACAO_RECUSADA = 'ORIENTACAO_RECUSADA', // Orientação recusada pelo orientador
    ENTREGA_PARCIAL_REALIZADA = 'ENTREGA_PARCIAL_REALIZADA', // Entrega parcial realizada
    ENTREGA_PARCIAL_APROVADA = 'ENTREGA_PARCIAL_APROVADA', // Nota parcial atribuída e maior ou igual a 6
    ENTREGA_FINAL = 'ENTREGA_FINAL', // Entrega final realizada
    APROVADO = 'APROVADO', // TFG aprovado após avaliação da entrega final
    REPROVADO = 'REPROVADO', // TFG reprovado a qualquer momento do processo
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

export class Tfg extends AbstractAggregateRoot<string> {
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

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarTfgProps): Error | Tfg {
        const tfg = new Tfg()

        if (props.coorientador && props.coorientador === props.orientador)
            return new InvalidPropsException(
                'O coorientador não pode ser o mesmo que o orientador',
            )

        tfg.setStatus(STATUS_TFG.MATRICULA_REALIZADA)
        const setAluno = tfg.setAluno(props.aluno)
        const setOrientador = tfg.setOrientador(props.orientador)
        const setCoorientador = tfg.setCoorientador(props.coorientador)
        const setTitulo = tfg.setTitulo(props.titulo)
        const setPalavrasChave = tfg.setPalavrasChave(props.palavrasChave)
        const setIntroducao = tfg.setIntroducao(props.introducao)
        const setObjetivos = tfg.setObjetivos(props.objetivos)
        const setBibliografia = tfg.setBibliografia(props.bibliografia)
        const setMetodoPesquisa = tfg.setMetodoPesquisa(props.metodoPesquisa)
        const setTecnicaPesquisa = tfg.setTecnicaPesquisa(props.tecnicaPesquisa)
        const setDescricaoMetodologia = tfg.setDescricaoMetodologia(
            props.descricaoMetodologia,
        )
        const setResultados = tfg.setResultados(props.resultadosEsperados)

        if (setAluno instanceof Error) return setAluno
        if (setOrientador instanceof Error) return setOrientador
        if (setCoorientador instanceof Error) return setCoorientador
        if (setTitulo instanceof Error) return setTitulo
        if (setPalavrasChave instanceof Error) return setPalavrasChave
        if (setIntroducao instanceof Error) return setIntroducao
        if (setObjetivos instanceof Error) return setObjetivos
        if (setBibliografia instanceof Error) return setBibliografia
        if (setMetodoPesquisa instanceof Error) return setMetodoPesquisa
        if (setTecnicaPesquisa instanceof Error) return setTecnicaPesquisa
        if (setDescricaoMetodologia instanceof Error)
            return setDescricaoMetodologia
        if (setResultados instanceof Error) return setResultados

        tfg.apply(
            new TfgCadastradoEvent({
                id: tfg.id,
                titulo: tfg.titulo,
                alunoEmail: props.aluno.getEmail(),
                alunoNome: props.aluno.getNome(),
                orientadorEmail: props.orientador.getEmail(),
                orientadorNome: props.orientador.getNome(),
                coorientadorEmail: props.coorientador?.getEmail() ?? undefined,
                coorientadorNome: props.coorientador?.getNome() ?? undefined,
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

    private setTitulo(titulo: string): Error | void {
        if (!titulo?.trim())
            return new InvalidPropsException('Título não informado')

        this.titulo = titulo
    }

    private setPalavrasChave(palavrasChave: string): Error | void {
        if (!palavrasChave?.trim())
            return new InvalidPropsException('Palavras-chave não informadas')

        this.palavrasChave = palavrasChave
    }

    private setIntroducao(introducao: string): Error | void {
        if (!introducao?.trim())
            return new InvalidPropsException('Introdução não informada')

        this.introducao = introducao
    }

    private setObjetivos(objetivos: string): Error | void {
        if (!objetivos?.trim())
            return new InvalidPropsException('Objetivos não informados')

        this.objetivos = objetivos
    }

    private setBibliografia(bibliografia: string): Error | void {
        if (!bibliografia?.trim())
            return new InvalidPropsException('Bibliografia não informada')

        this.bibliografia = bibliografia
    }

    private setMetodoPesquisa(metodo: string): Error | void {
        if (!metodo?.trim())
            return new InvalidPropsException('Método de pesquisa não informado')

        this.metodoPesquisa = metodo
    }

    private setTecnicaPesquisa(tecnica: string): Error | void {
        if (!tecnica?.trim())
            return new InvalidPropsException(
                'Técnica de pesquisa não informada',
            )

        this.tecnicaPesquisa = tecnica
    }

    private setDescricaoMetodologia(descricao: string): Error | void {
        if (!descricao?.trim())
            return new InvalidPropsException(
                'Descrição da metodologia não informada',
            )

        this.descricaoMetodologia = descricao
    }

    private setResultados(resultados: string): Error | void {
        if (!resultados?.trim())
            return new InvalidPropsException(
                'Resultados esperados não informados',
            )

        this.resultadosEsperados = resultados
    }

    private setAluno(aluno: Usuario): Error | void {
        if (!aluno) {
            return new InvalidPropsException('Aluno não informado')
        }

        if (aluno.getTipo() !== TIPO_USUARIO.ALUNO) {
            return new InvalidPropsException('Usuário informado não é um aluno')
        }

        this.alunoId = aluno.getId()
    }

    private setOrientador(orientador: Usuario): Error | void {
        if (!orientador) {
            return new InvalidPropsException('Orientador não informado')
        }

        if (orientador.getTipo() !== TIPO_USUARIO.PROFESSOR) {
            return new InvalidPropsException(
                'Usuário informado não é um professor',
            )
        }

        this.orientadorId = orientador.getId()
    }

    private setCoorientador(coorientador: Usuario): Error | void {
        if (!coorientador) {
            this.coorientadorId = null
            return
        }
        if (coorientador.getTipo() !== TIPO_USUARIO.PROFESSOR) {
            return new InvalidPropsException(
                'Usuário informado não é um professor',
            )
        }

        this.coorientadorId = coorientador.getId()
    }

    private setNotaParcial(nota_parcial: number): Error | void {
        if (!nota_parcial) {
            return new InvalidPropsException('Nota não informada')
        }

        if (nota_parcial < 0 || nota_parcial > 10) {
            return new InvalidPropsException('Nota deve ser entre 0 e 10')
        }

        this.notaParcial = nota_parcial
    }

    public atribuirBanca(banca: Banca): Error | void {
        try {
            if (this.banca)
                return new UsuarioException(
                    'A banca já foi atribuída a este TFG',
                )

            if (
                banca.getProfessorId() === this.getOrientador() ||
                banca.getSegundoProfessorId() === this.getOrientador()
            )
                return new InvalidPropsException(
                    'A banca deve ser integrada por professores diferentes do orientador',
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

    public editarBanca(props: {
        professorId?: string
        segundoProfessorId?: string
        data?: Date
    }): Error | void {
        if (!this.banca)
            return new TfgException('A banca deste TFG ainda não foi atribuída')

        if (
            this.status !== STATUS_TFG.ENTREGA_PARCIAL_APROVADA &&
            this.status !== STATUS_TFG.ENTREGA_FINAL
        )
            return new TfgException(
                'A banca só pode ser editada após a aprovação da entrega parcial e antes da entrega final',
            )

        const editar = this.banca.editarBanca(props)
        if (editar instanceof Error) return editar

        this.apply(
            new BancaEditadaEvent({
                tfgId: this.id,
                alteracoes: props,
            }),
        )
    }

    public avaliarOrientacao(
        professorId: string,
        status: boolean,
        justificativa?: string,
    ): Error | void {
        if (professorId !== this.orientadorId)
            return new UsuarioException(
                'O professor que está avaliando não é orientador deste TFG',
            )

        if (status) {
            if (justificativa?.trim())
                return new InvalidPropsException(
                    'A justificativa não deve ser informada em caso de aprovação',
                )
            this.setStatus(STATUS_TFG.ORIENTACAO_ACEITA)
            this.apply(
                new TfgOrientacaoAprovadaEvent({
                    id: this.id,
                    alunoId: this.alunoId,
                    orientadorId: this.orientadorId,
                    titulo: this.titulo,
                }),
            )
        } else {
            if (!justificativa?.trim())
                return new InvalidPropsException(
                    'A justificativa deve ser informada em caso de reprovação',
                )
            this.setStatus(STATUS_TFG.ORIENTACAO_RECUSADA)
            this.apply(
                new TfgOrientacaoRecusadaEvent({
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
            return new UsuarioException(
                'O professor que está avaliando não é orientador deste TFG',
            )

        this.setNotaParcial(nota)

        this.setStatus(
            nota >= 6
                ? STATUS_TFG.ENTREGA_PARCIAL_APROVADA
                : STATUS_TFG.REPROVADO,
        )

        this.apply(
            new TfgNotaParcialAvaliadaEvent({
                id: this.id,
                nota: nota,
            }),
        )
    }

    public avaliarNotaFinalBanca(
        professorId: string,
        notaApresentacao: number,
        notaTrabalho: number,
    ): Error | void {
        if (this.status !== STATUS_TFG.ENTREGA_FINAL)
            return new TfgException(
                'O atual estado do TFG não permite a avaliação final',
            )

        if (!this.banca)
            return new TfgException('A banca deste TFG ainda não foi atribuída')

        if (
            ![
                this.banca.getProfessorId(),
                this.banca.getSegundoProfessorId(),
            ].includes(professorId)
        )
            return new UsuarioException(
                'O professor que está avaliando não faz parte da banca deste TFG',
            )

        this.banca.avaliarNotaTfg(professorId, notaApresentacao, notaTrabalho)

        this.apply(
            new TfgNotaFinalAvaliadaEvent({
                tfgId: this.id,
            }),
        )
    }

    public calcularNotaFinal(): Error | void {
        if (!this.banca)
            return new TfgException('A banca deste TFG ainda não foi atribuída')

        if (
            !this.banca.getNotaApresentacaoProfessor() ||
            !this.banca.getNotaApresentacaoSegundoProfessor() ||
            !this.banca.getNotaTrabalhoProfessor() ||
            !this.banca.getNotaTrabalhoSegundoProfessor()
        )
            return new TfgException(
                'A nota final não pode ser calculada sem que todas as notas da banca estejam atribuídas',
            )

        this.notaFinal =
            0.3 * this.notaParcial +
            0.4 *
                ((this.banca.getNotaApresentacaoProfessor() +
                    this.banca.getNotaApresentacaoSegundoProfessor()) /
                    2) +
            0.3 *
                ((this.banca.getNotaTrabalhoProfessor() +
                    this.banca.getNotaTrabalhoSegundoProfessor()) /
                    2)
        this.status =
            this.notaFinal >= 6 ? STATUS_TFG.APROVADO : STATUS_TFG.REPROVADO
    }

    public enviarTfg(path: string, tipoEntrega: TIPO_ENTREGA): Error | void {
        if (!path?.trim()) {
            return new InvalidPropsException('Caminho do arquivo não informado')
        }

        tipoEntrega === TIPO_ENTREGA.PARCIAL
            ? (this.pathParcial = path)
            : (this.pathFinal = path)
        this.setStatus(
            tipoEntrega === TIPO_ENTREGA.PARCIAL
                ? STATUS_TFG.ENTREGA_PARCIAL_REALIZADA
                : STATUS_TFG.ENTREGA_FINAL,
        )

        this.apply(
            new TfgEnviadoEvent({
                id: this.id,
                path: path,
                tipoEntrega,
            }),
        )
    }

    public toDTO() {
        return {
            id: this.getId(),
            aluno: this.getAluno(),
            orientador: this.getOrientador(),
            coorientador: this.getCoorientador(),
            status: this.getStatus(),
            titulo: this.getTitulo(),
            palavrasChave: this.getPalavrasChave(),
            introducao: this.getIntroducao(),
            objetivos: this.getObjetivos(),
            bibliografia: this.getBibliografia(),
            metodoPesquisa: this.getMetodoPesquisa(),
            tecnicaPesquisa: this.getTecnicaPesquisa(),
            descricaoMetodologia: this.getDescricaoMetodologia(),
            resultados: this.getResultados(),
            notaParcial: this.getNotaParcial(),
            notaFinal: this.getNotaFinal(),
            banca: this.getBanca(),
            pathParcial: this.getPathParcial(),
            pathFinal: this.getPathFinal(),
        }
    }
}
