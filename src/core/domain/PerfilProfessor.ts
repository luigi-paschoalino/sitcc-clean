import { AbstractEntity } from '../../shared/domain/AbstractEntity'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'
import { Projeto } from './Projeto'

export interface CriarPerfilProps {
    descricao: string
    link: string
    areasAtuacao: string[]
    projetos?: Projeto[]
}

export class PerfilProfessor extends AbstractEntity<string> {
    private descricao: string
    private link: string
    private areasAtuacao: string[]
    private projetos?: Projeto[]

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarPerfilProps, id?: string): PerfilProfessor {
        const instance = new PerfilProfessor(id)

        instance.descricao = props.descricao
        instance.link = props.link
        instance.areasAtuacao = props.areasAtuacao ? props.areasAtuacao : []

        return instance
    }

    public atualizar(props: Omit<CriarPerfilProps, 'projetos'>): Error | void {
        if (Object.keys(props).length === 0)
            return new InvalidPropsException('Dados do perfil não informados')

        this.descricao = props.descricao ? props.descricao : this.descricao
        this.link = props.link ? props.link : this.link
        this.areasAtuacao = props.areasAtuacao
            ? props.areasAtuacao
            : this.areasAtuacao
    }

    public getDescricao(): string {
        return this.descricao
    }

    public getLink(): string {
        return this.link
    }

    public getAreasAtuacao(): string[] {
        return this.areasAtuacao
    }

    public getProjetos(): Projeto[] {
        return this.projetos
    }
}
