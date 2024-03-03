import { AbstractEntity } from '../../shared/domain/AbstractEntity'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'

export interface CriarNormaProps {
    titulo: string
    descricao: string
    link: string
}

export interface CarregarNormaProps {
    titulo: string
    descricao: string
    link: string
    dataPublicacao: Date
}

export class Norma extends AbstractEntity {
    private titulo: string
    private descricao: string
    private link: string
    private dataPublicacao: Date

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarNormaProps): Error | Norma {
        const norma = new Norma()

        const setTitulo = norma.setTitulo(props.titulo)
        const setDescricao = norma.setDescricao(props.descricao)
        const setLink = norma.setLink(props.link)

        if (setTitulo instanceof Error) return setTitulo
        if (setDescricao instanceof Error) return setDescricao
        if (setLink instanceof Error) return setLink

        norma.dataPublicacao = new Date()

        return norma
    }

    static carregar(props: CarregarNormaProps, id: string) {
        const norma = new Norma(id)

        norma.titulo = props.titulo
        norma.descricao = props.descricao
        norma.link = props.link
        norma.dataPublicacao = props.dataPublicacao

        return norma
    }

    private setTitulo(titulo: string): Error | void {
        titulo = titulo.trim()
        if (!titulo)
            return new InvalidPropsException(
                'Título da Norma não pode ser vazio',
            )
        this.titulo = titulo
    }

    private setDescricao(descricao: string): Error | void {
        descricao = descricao.trim()
        if (!descricao)
            throw new InvalidPropsException(
                'Descrição da Norma não pode ser vazio',
            )
        this.descricao = descricao
    }

    private setLink(link: string): Error | void {
        link = link.trim()
        if (!link)
            throw new InvalidPropsException('Link da Norma não pode ser vazio')
        this.link = link
    }

    getTitulo() {
        return this.titulo
    }

    getDescricao() {
        return this.descricao
    }

    getLink() {
        return this.link
    }

    getDataPublicacao() {
        return this.dataPublicacao
    }
}
