import { AggregateRoot } from '@nestjs/cqrs'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface GerarCodigoProfessorProps {
    codigo: string
    id: string
    professorId: string
}

export interface CarregarCodigoProfessorProps {
    codigo: string
    disponivel: boolean
    id: string
    professorId: string
}

export class CodigoProfessor extends AggregateRoot {
    private id: string
    private codigo: string
    private disponivel: boolean
    private professorId: string

    constructor(id: string) {
        super()

        this.id = id
    }

    static criar(props: GerarCodigoProfessorProps): CodigoProfessor {
        const instance = new CodigoProfessor(props.id)
        instance.setCodigo(props.codigo)
        instance.setDisponivel(true)
        instance.professorId = props.professorId

        return instance
    }

    static carregar(props: CarregarCodigoProfessorProps): CodigoProfessor {
        const instance = new CodigoProfessor(props.id)
        instance.codigo = props.codigo
        instance.disponivel = props.disponivel
        instance.professorId = props.professorId

        return instance
    }

    private setCodigo(codigo: string): Error | void {
        if (!codigo)
            throw new InvalidPropsException(
                'Código do professor não pode ser vazio',
            )
        this.codigo = codigo
    }

    private setDisponivel(disponivel: boolean): void {
        this.disponivel = disponivel
    }

    getCodigo(): string {
        return this.codigo
    }

    getId(): string {
        return this.id
    }

    getDisponivel(): boolean {
        return this.disponivel
    }

    getProfessorId(): string {
        return this.professorId
    }

    consumirCodigo(): void {
        this.setDisponivel(false)
    }
}
