import { Projeto } from './Projeto'

export interface CriarPerfilProps {
    descricao: string
    link: string
    projetos?: Projeto[]
}
export class PerfilProfessor {
    private id: string
    private descricao: string
    private link: string
    private projetos?: Projeto[]

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarPerfilProps, id: string): PerfilProfessor {
        const instance = new PerfilProfessor(id)

        instance.descricao = props.descricao
        instance.link = props.link

        return instance
    }

    public getId(): string {
        return this.id
    }

    public getDescricao(): string {
        return this.descricao
    }

    public getLink(): string {
        return this.link
    }

    public getProjetos(): Projeto[] {
        return this.projetos
    }
}
