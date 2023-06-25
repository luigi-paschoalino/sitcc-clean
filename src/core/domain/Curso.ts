import { AggregateRoot } from '@nestjs/cqrs'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarCursoProps {
    nome: string
    codigo: string
}

export class Curso {
    private id: string
    private nome: string
    private codigo: string

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
