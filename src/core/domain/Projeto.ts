import { AbstractEntity } from '../../shared/domain/AbstractEntity'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'

export interface CriarProjetoProps {
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

export class Projeto extends AbstractEntity<string> {
    private titulo: string
    private descricao: string
    private preRequisitos: string
    private disponivel: boolean

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarProjetoProps): Error | Projeto {
        try {
            if (Object.keys(props).length === 0)
                throw new InvalidPropsException(
                    'Dados do projeto não informados',
                )

            const instance = new Projeto()

            const setTitulo = instance.setTitulo(props.titulo)
            const setDescricao = instance.setDescricao(props.descricao)
            const setPreRequisitos = instance.setPreRequisitos(
                props.preRequisitos,
            )
            const setDisponivel = instance.setDisponivel(props.disponivel)

            if (setTitulo instanceof Error) return setTitulo
            if (setDescricao instanceof Error) return setDescricao
            if (setPreRequisitos instanceof Error) return setPreRequisitos
            if (setDisponivel instanceof Error) return setDisponivel

            return instance
        } catch (error) {
            return error
        }
    }

    static carregar(props: CriarProjetoProps, id: string) {
        const instance = new Projeto(id)

        instance.titulo = props.titulo
        instance.descricao = props.descricao
        instance.preRequisitos = props.preRequisitos
        instance.disponivel = props.disponivel

        return instance
    }

    private setTitulo(titulo: string): Error | void {
        if (!titulo) return new InvalidPropsException('Titulo não informado')

        this.titulo = titulo
    }

    private setDescricao(descricao: string): Error | void {
        if (!descricao)
            return new InvalidPropsException('Descrição não informada')

        this.descricao = descricao
    }

    private setPreRequisitos(preRequisitos: string): Error | void {
        if (!preRequisitos)
            return new InvalidPropsException('Pré-requisitos não informados')

        this.preRequisitos = preRequisitos
    }

    private setDisponivel(disponivel: boolean): Error | void {
        if (!disponivel)
            return new InvalidPropsException('Disponibilidade não informada')

        this.disponivel = disponivel
    }

    getTitulo(): string {
        return this.titulo
    }

    getDescricao(): string {
        return this.descricao
    }

    getPreRequisitos(): string {
        return this.preRequisitos
    }

    getDisponivel(): boolean {
        return this.disponivel
    }
}
