import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarProjetoProps {
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

export class Projeto {
    private id: string
    private titulo: string
    private descricao: string
    private preRequisitos: string
    private disponivel: boolean

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarProjetoProps, id: string): Projeto {
        try {
            if (Object.keys(props).length === 0)
                throw new InvalidPropsException(
                    'Dados do projeto não informados',
                )

            const instance = new Projeto(id)

            instance.setTitulo(props.titulo)
            instance.setDescricao(props.descricao)
            instance.setPreRequisitos(props.preRequisitos)
            instance.setDisponivel(props.disponivel)

            return instance
        } catch (error) {
            return error
        }
    }

    private setTitulo(titulo: string) {
        if (!titulo) throw new InvalidPropsException('Titulo não informado')
        this.titulo = titulo
    }

    private setDescricao(descricao: string) {
        if (!descricao)
            throw new InvalidPropsException('Descrição não informada')
        this.descricao = descricao
    }

    private setPreRequisitos(preRequisitos: string) {
        if (!preRequisitos)
            throw new InvalidPropsException('Pré-requisitos não informados')
        this.preRequisitos = preRequisitos
    }

    private setDisponivel(disponivel: boolean) {
        if (!disponivel)
            throw new InvalidPropsException('Disponibilidade não informada')
        this.disponivel = disponivel
    }

    getId(): string {
        return this.id
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
