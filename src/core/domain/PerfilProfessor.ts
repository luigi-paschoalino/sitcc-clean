import { AbstractEntity } from '../../shared/domain/AbstractEntity'
import { AreasAtuacao } from './AreasAtuacao'
import { Projeto } from './Projeto'

export interface CriarPerfilProps {
    descricao: string
    link: string
    projetos?: Projeto[]
    areasAtuacao?: AreasAtuacao[]
}
export class PerfilProfessor extends AbstractEntity<string> {
    private descricao: string
    private link: string
    private projetos?: Projeto[]
    private areasAtuacao?: AreasAtuacao[]

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarPerfilProps): PerfilProfessor {
        const instance = new PerfilProfessor()

        instance.descricao = props.descricao
        instance.link = props.link

        return instance
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

    public getAreasAtuacao(): AreasAtuacao[] {
        return this.areasAtuacao
    }
}
