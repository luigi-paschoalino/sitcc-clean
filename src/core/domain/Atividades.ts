import { AbstractEntity } from '../../shared/domain/AbstractEntity'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'

export enum TIPO_ATIVIDADE {
    ENTREGA_PARCIAL = 'ENTREGA_PARCIAL',
    ENTREGA_FINAL = 'ENTREGA_FINAL',
    DATA_DEFESA = 'DATA_DEFESA',
}

export interface CriarAtividadeProps {
    data: Date
    titulo: TIPO_ATIVIDADE
    descricao: string
}

export class Atividade extends AbstractEntity<string> {
    private data: Date
    private titulo: TIPO_ATIVIDADE
    private descricao: string

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarAtividadeProps): Error | Atividade {
        const atividade = new Atividade()

        const setData = atividade.setData(props.data)
        const setTitulo = atividade.setTitulo(props.titulo)
        const setDescricao = atividade.setDescricao(props.descricao)

        if (setData instanceof Error) return setData
        if (setTitulo instanceof Error) return setTitulo
        if (setDescricao instanceof Error) return setDescricao

        return atividade
    }

    static carregar(props: CriarAtividadeProps, id: string): Atividade {
        const atividade = new Atividade(id)

        atividade.data = props.data
        atividade.titulo = props.titulo
        atividade.descricao = props.descricao

        return atividade
    }

    private setData(data: Date): Error | void {
        if (new Date(data) < new Date())
            return new InvalidPropsException('Data inválida')
        this.data = new Date(data)
    }

    private setTitulo(titulo: TIPO_ATIVIDADE): Error | void {
        if (!titulo) return new InvalidPropsException('Titulo não informado')
        if (!Object.values(TIPO_ATIVIDADE).includes(titulo))
            return new InvalidPropsException('Titulo inválido')
        this.titulo = titulo
    }

    private setDescricao(descricao: string): Error | void {
        if (!descricao)
            return new InvalidPropsException(
                'Descrição da atividade não pode ser vazia',
            )
        this.descricao = descricao
    }

    getTitulo() {
        return this.titulo
    }

    getDescricao() {
        return this.descricao
    }

    getData() {
        return this.data
    }
}
