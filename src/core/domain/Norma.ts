import { AggregateRoot } from '@nestjs/cqrs'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarNormaProps {
    titulo: string
    descricao: string
    link: string
}

// TODO: criar CadastrarNormaUsecase
export class Norma {
    private id: string
    private titulo: string
    private descricao: string
    private link: string

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarNormaProps, id: string): Norma {
        const norma = new Norma(id)

        norma.setTitulo(props.titulo)
        norma.setDescricao(props.descricao)
        norma.setLink(props.link)

        return norma
    }

    private setTitulo(titulo: string) {
        if (!titulo)
            throw new InvalidPropsException(
                'Título da Norma não pode ser vazio',
            )
        this.titulo = titulo
    }

    private setDescricao(descricao: string) {
        if (!descricao)
            throw new InvalidPropsException(
                'Descrição da Norma não pode ser vazio',
            )
        this.descricao = descricao
    }

    private setLink(link: string) {
        if (!link)
            throw new InvalidPropsException('Link da Norma não pode ser vazio')
        this.link = link
    }

    getId() {
        return this.id
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
}
