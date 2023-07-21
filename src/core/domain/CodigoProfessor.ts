import { AggregateRoot } from '@nestjs/cqrs'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export class CodigoProfessor extends AggregateRoot {
    private id: string
    private codigo: string
    private disponivel: boolean

    constructor(id: string) {
        super()

        this.id = id
    }

    static gerar(codigo: string, id: string): CodigoProfessor {
        const instance = new CodigoProfessor(id)
        instance.setCodigo(codigo)
        instance.setDisponivel(true)

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
