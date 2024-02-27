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

    static criar(props: CriarAtividadeProps): Atividade {
        const atividade = new Atividade()

        atividade.setData(props.data)
        atividade.setTitulo(props.titulo)
        atividade.setDescricao(props.descricao)

        return atividade
    }
    //TODO :função carregar

    private setData(data: Date) {
        //TODO: validar data
        this.data = data
    }

    private setTitulo(titulo: TIPO_ATIVIDADE) {
        if (!titulo) throw new InvalidPropsException('Titulo não informado')
        if (!Object.values(TIPO_ATIVIDADE).includes(titulo))
            throw new InvalidPropsException('Titulo inválido')
        this.titulo = titulo
    }

    private setDescricao(descricao: string) {
        if (!descricao)
            throw new InvalidPropsException(
                'Descrição da Atividade não pode ser vazio',
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
