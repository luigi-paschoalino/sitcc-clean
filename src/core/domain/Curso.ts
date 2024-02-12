import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { Norma } from './Norma'
import { Cronograma } from './Cronograma'
import { AggregateRoot } from '@nestjs/cqrs'

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

export class Curso extends AggregateRoot {
    private id: string
    private nome: string
    private codigo: string
    private normas?: Norma[]
    private cronogramas?: Cronograma[]

    private constructor(id: string) {
        super()

        this.id = id
    }

    //TODO: criar função pra gerar UUID por conta
    static criar(props: CriarCursoProps): Curso {
        const instance = new Curso('')
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

    private setNome(nome: string) {
        if (!nome)
            throw new InvalidPropsException('Nome do curso não pode ser vazio')
        this.nome = nome
    }

    private setCodigo(codigo: string) {
        if (!codigo)
            throw new InvalidPropsException(
                'Código do curso não pode ser vazio',
            )
        this.codigo = codigo
    }

    private setCronogramas(cronogramas: Cronograma[]) {
        if (!cronogramas)
            throw new InvalidPropsException(
                'Cronogramas do curso não pode ser vazio',
            )
        this.cronogramas = cronogramas
    }

    adicionarNorma(norma: Norma) {
        this.normas.push(norma)
    }

    adicionarCronograma(cronograma: Cronograma) {
        this.cronogramas.push(cronograma)
    }

    getNome() {
        return this.nome
    }

    getCodigo() {
        return this.codigo
    }

    getId(): string {
        return this.id
    }

    getNormas(): Norma[] {
        return this.normas
    }

    getCronogramas(): Cronograma[] {
        return this.cronogramas
    }
}
