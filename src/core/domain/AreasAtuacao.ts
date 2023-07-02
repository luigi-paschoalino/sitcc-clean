export interface CriarAreasAtuacaoProps {
    titulo: string
    descricao: string
}

export class AreasAtuacao {
    private titulo: string
    private descricao: string

    private constructor() {}

    static criar(props: CriarAreasAtuacaoProps): AreasAtuacao {
        const instance = new AreasAtuacao()

        instance.setTitulo(props.titulo)
        instance.setDescricao(props.descricao)

        return instance
    }

    private setTitulo(titulo: string): void {
        this.titulo = titulo
    }

    private setDescricao(descricao: string): void {
        this.descricao = descricao
    }

    getTitulo(): string {
        return this.titulo
    }

    getDescricao(): string {
        return this.descricao
    }
}
