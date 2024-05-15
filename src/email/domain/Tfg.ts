import { AbstractAggregateRoot } from '../../shared/domain/AbstractAggregateRoot'

interface CriarTfgProps {
    titulo: string
    // Nomes, não IDs
    aluno: UsuarioProps
    orientador: UsuarioProps
    coorientador?: UsuarioProps
    notaParcial?: number
    notaFinal?: number
}

interface UsuarioProps {
    nome: string
    email: string
}

export class Tfg extends AbstractAggregateRoot<string> {
    private titulo: string
    private aluno: UsuarioProps
    private orientador: UsuarioProps
    private coorientador?: UsuarioProps
    private notaParcial: number
    private notaFinal: number

    constructor(id: string) {
        super(id)
    }

    public static criar(props: CriarTfgProps, id: string): Tfg {
        const tfg = new Tfg(id)

        tfg.titulo = props.titulo
        tfg.aluno = props.aluno
        tfg.orientador = props.orientador
        tfg.coorientador = props.coorientador ?? undefined
        tfg.notaParcial = props.notaParcial ?? 0
        tfg.notaFinal = props.notaFinal ?? 0

        return tfg
    }

    public getTitulo(): string {
        return this.titulo
    }

    public getAluno(): UsuarioProps {
        return this.aluno
    }

    public getOrientador(): UsuarioProps {
        return this.orientador
    }

    public getCoorientador(): UsuarioProps | undefined {
        return this.coorientador
    }

    public getNotaParcial(): number {
        return this.notaParcial
    }

    public getNotaFinal(): number {
        return this.notaFinal
    }
}
