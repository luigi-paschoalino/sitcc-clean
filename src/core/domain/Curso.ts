import { AggregateRoot } from '@nestjs/cqrs'
import { Instituto } from './Instituto'

export class Curso extends AggregateRoot {
    private id: string
    private nome: string
    private codigo: string
    private instituto: Instituto

    private constructor() {
        super()
    }

    static criar(
        id: string,
        nome: string,
        codigo: string,
        instituto: Instituto,
    ): Curso {
        const curso = new Curso()
        curso.id = id
        curso.nome = nome
        curso.codigo = codigo
        curso.instituto = instituto
        return curso
    }

    getId(): string {
        return this.id
    }
}
