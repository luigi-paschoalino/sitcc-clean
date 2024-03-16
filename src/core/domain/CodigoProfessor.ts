import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'
import { AbstractAggregateRoot } from '../../shared/domain/AbstractAggregateRoot'
import { CodigoProfessorGeradoEvent } from './events/CodigoProfessorGerado.event'

export interface GerarCodigoProfessorProps {
    codigo: string
    email: string
}

export interface CarregarCodigoProfessorProps {
    codigo: string
    disponivel: boolean
    email: string
}

export class CodigoProfessor extends AbstractAggregateRoot<string> {
    private codigo: string
    private disponivel: boolean
    private email: string

    constructor(id?: string) {
        super(id)
    }

    static criar(props: GerarCodigoProfessorProps): Error | CodigoProfessor {
        const instance = new CodigoProfessor()

        const setCodigo = instance.setCodigo(props.codigo)
        const setEmail = instance.setEmail(props.email)

        if (setCodigo instanceof Error) return setCodigo
        if (setEmail instanceof Error) return setEmail

        instance.setDisponivel(true)

        instance.apply(
            new CodigoProfessorGeradoEvent({
                id: instance.getId(),
                codigo: instance.getCodigo(),
                email: instance.getEmail(),
            }),
        )

        return instance
    }

    static carregar(
        props: CarregarCodigoProfessorProps,
        id: string,
    ): CodigoProfessor {
        const instance = new CodigoProfessor(id)

        instance.codigo = props.codigo
        instance.disponivel = props.disponivel
        instance.email = props.email

        return instance
    }

    private setCodigo(codigo: string): Error | void {
        if (!codigo)
            return new InvalidPropsException(
                'Código do professor não pode ser vazio',
            )
        this.codigo = codigo
    }

    private setDisponivel(disponivel: boolean): void {
        this.disponivel = disponivel
    }

    private setEmail(email: string): Error | void {
        if (!email)
            return new InvalidPropsException(
                'Email do professor não pode ser vazio',
            )
        this.email = email
    }

    getCodigo(): string {
        return this.codigo
    }

    getDisponivel(): boolean {
        return this.disponivel
    }

    getEmail(): string {
        return this.email
    }

    consumirCodigo(): void {
        this.setDisponivel(false)
    }
}
