import { AggregateRoot } from '@nestjs/cqrs'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { Cronograma } from './Cronograma'

export interface CriarCursoProps {
    nome: string
    codigo: string
}

export class Curso {
    private id: string
    private nome: string
    private codigo: string
    private cronogramas: Cronograma[]

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarCursoProps, id: string): Curso {
        const instance = new Curso(id)
        instance.setNome(props.nome)
        instance.setCodigo(props.codigo)

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
}
