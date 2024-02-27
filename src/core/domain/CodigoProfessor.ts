import { AggregateRoot } from '@nestjs/cqrs'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'

export interface GerarCodigoProfessorProps {
    codigo: string
    id: string
}

export interface CarregarCodigoProfessorProps {
    codigo: string
    disponivel: boolean
    id: string
}

export class CodigoProfessor extends AggregateRoot {
    private id: string
    private codigo: string
    private disponivel: boolean

    constructor(id: string) {
        super()

        this.id = id
    }

    static criar(props: GerarCodigoProfessorProps): CodigoProfessor {
        const instance = new CodigoProfessor(props.id)
        instance.setCodigo(props.codigo)
        instance.setDisponivel(true)

        return instance
    }

    static carregar(props: CarregarCodigoProfessorProps): CodigoProfessor {
        const instance = new CodigoProfessor(props.id)
        instance.codigo = props.codigo
        instance.disponivel = props.disponivel

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

    consumirCodigo(): void {
        this.setDisponivel(false)
    }
}
