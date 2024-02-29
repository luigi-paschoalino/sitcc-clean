import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'
import { AbstractAggregateRoot } from '../../shared/domain/AbstractAggregateRoot'

export interface GerarCodigoProfessorProps {
    codigo: string
}

export interface CarregarCodigoProfessorProps {
    codigo: string
    disponivel: boolean
}

export class CodigoProfessor extends AbstractAggregateRoot<string> {
    private codigo: string
    private disponivel: boolean

    constructor(id?: string) {
        super(id)
    }

    static criar(props: GerarCodigoProfessorProps): CodigoProfessor {
        const instance = new CodigoProfessor()

        instance.setCodigo(props.codigo)
        instance.setDisponivel(true)

        return instance
    }

    static carregar(
        props: CarregarCodigoProfessorProps,
        id: string,
    ): CodigoProfessor {
        const instance = new CodigoProfessor(id)

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

    getDisponivel(): boolean {
        return this.disponivel
    }

    consumirCodigo(): void {
        this.setDisponivel(false)
    }
}
