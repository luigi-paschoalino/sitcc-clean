import { AggregateRoot } from '@nestjs/cqrs'
import { Universidade } from './Universidade'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarInstitutoProps {
    nome: string
}

export class Instituto extends AggregateRoot {
    id: string
    nome: string

    private constructor(id: string) {
        super()

        this.id = id
    }

    static criar(props: CriarInstitutoProps, id: string): Instituto {
        const instituto = new Instituto(id)

        instituto.id = id
        instituto.setNome(props.nome)

        return instituto
    }

    private setNome(nome: string) {
        if (!nome) throw new InvalidPropsException('Nome inválido!')
        this.nome = nome
    }

    getNome(): string {
        return this.nome
    }

    getId(): string {
        return this.id
    }
}
