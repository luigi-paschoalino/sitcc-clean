import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'
import { Norma } from './Norma'
import { Cronograma } from './Cronograma'
import { AbstractAggregateRoot } from '../../shared/domain/AbstractAggregateRoot'
import { Atividade } from './Atividades'
import { AtividadeAdicionadaEvent } from './events/AtividadeAdicionada.event'
import { AtividadeEditadaEvent } from './events/AtividadeEditada.event'
import { AtividadeRemovidaEvent } from './events/AtividadeRemovida.event'
import { NormaAdicionadaEvent } from './events/NormaAdicionada.event'
import { CursoException } from '../../shared/domain/exceptions/Curso.exception'

export interface CriarCursoProps {
    nome: string
    codigo: string
}

export interface CarregarCursoProps {
    nome: string
    codigo: string
    normas?: Norma[]
    cronogramas?: Cronograma[]
}

export class Curso extends AbstractAggregateRoot<string> {
    private nome: string
    private codigo: string
    private normas?: Norma[]
    private cronogramas?: Cronograma[]

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarCursoProps): Curso {
        const instance = new Curso()

        instance.setNome(props.nome)
        instance.setCodigo(props.codigo)

        return instance
    }

    static carregar(props: CarregarCursoProps, id: string): Curso {
        const instance = new Curso(id)

        instance.setNome(props.nome)
        instance.setCodigo(props.codigo)
        instance.normas = props.normas ?? []
        instance.setCronogramas(props.cronogramas ?? [])

        return instance
    }

    private setNome(nome: string): InvalidPropsException | void {
        if (!nome)
            throw new InvalidPropsException('Nome do curso não pode ser vazio')
        this.nome = nome
    }

    private setCodigo(codigo: string): InvalidPropsException | void {
        if (!codigo)
            throw new InvalidPropsException(
                'Código do curso não pode ser vazio',
            )
        this.codigo = codigo
    }

    private setCronogramas(
        cronogramas: Cronograma[],
    ): InvalidPropsException | void {
        if (!cronogramas)
            throw new InvalidPropsException(
                'Cronogramas do curso não pode ser vazio',
            )
        this.cronogramas = cronogramas
    }

    adicionarNorma(norma: Norma) {
        this.normas.push(norma)

        this.apply(
            new NormaAdicionadaEvent({
                cursoId: this.getId(),
                normaId: norma.getId(),
            }),
        )
    }

    adicionarCronograma(cronograma: Cronograma): Error | void {
        if (!this.cronogramas) this.cronogramas = []
        if (
            this.cronogramas.find(
                (c) =>
                    c.getAno() === cronograma.getAno() &&
                    c.getSemestre() === cronograma.getSemestre(),
            )
        ) {
            return new CursoException('Cronograma já existe')
        }
        this.cronogramas.push(cronograma)
    }

    adicionarAtividadeCronograma(
        cronogramaId: string,
        atividade: Atividade,
    ): Error | void {
        const cronograma = this.cronogramas.find(
            (cronograma) => cronograma.getId() === cronogramaId,
        )
        if (!cronograma)
            return new InvalidPropsException('Cronograma não existe')

        const adicionar = cronograma.adicionarAtividade(atividade)
        if (adicionar instanceof Error) return adicionar

        this.apply(
            new AtividadeAdicionadaEvent({
                cursoId: this.getId(),
                cronogramaId: cronogramaId,
            }),
        )
    }

    editarAtividadeCronograma(
        cronogramaId: string,
        atividade: Atividade,
    ): Error | void {
        const cronograma = this.cronogramas.find(
            (cronograma) => cronograma.getId() === cronogramaId,
        )
        if (!cronograma)
            return new InvalidPropsException('Cronograma não existe')

        const editar = cronograma.editarAtividade(atividade)
        if (editar instanceof Error) return editar

        this.apply(
            new AtividadeEditadaEvent({
                cursoId: this.getId(),
                cronogramaId: cronogramaId,
                atividadeId: atividade.getId(),
            }),
        )
    }

    removerAtividadeCronograma(
        cronogramaId: string,
        atividadeId: string,
    ): Error | void {
        const cronograma = this.cronogramas.find(
            (cronograma) => cronograma.getId() === cronogramaId,
        )
        if (!cronograma)
            return new InvalidPropsException('Cronograma não existe')

        const remover = cronograma.removerAtividade(atividadeId)
        if (remover instanceof Error) return remover

        this.apply(
            new AtividadeRemovidaEvent({
                cursoId: this.getId(),
                cronogramaId: cronogramaId,
            }),
        )
    }

    editarCurso(props: { nome?: string; codigo?: string }) {
        if (props.nome) this.setNome(props.nome)
        if (props.codigo) this.setCodigo(props.codigo)
    }

    getNome() {
        return this.nome
    }

    getCodigo() {
        return this.codigo
    }

    getNormas(): Norma[] {
        return this.normas
    }

    getCronogramas(): Cronograma[] {
        return this.cronogramas
    }

    getCronogramaVigente(): Cronograma {
        return this.cronogramas?.sort((a, b) => {
            const ano = b.getAno() - a.getAno()
            if (ano !== 0) {
                return ano
            }

            const semestre = a.getSemestre() === 'SEGUNDO' ? -1 : 1
            return semestre
        })[0]
    }
}
