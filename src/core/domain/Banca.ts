import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarBancaProps {
    professorId: string
    segundoProfessorId: string
    data: Date
}

export interface CarregarBancaProps {
    professorId: string
    segundoProfessorId: string
    data: Date
    notaApresentacao: number
    notaTrabalho: number
}

export class Banca {
    private id: string
    private professorId: string
    private segundoProfessorId: string
    private data: Date
    private notaApresentacao: number
    private notaTrabalho: number
    private versao: number

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarBancaProps, id: string): Banca {
        const banca = new Banca(id)

        banca.setProfessorId(props.professorId)
        banca.setData(props.data)

        return banca
    }

    static carregar(props: CarregarBancaProps, id: string): Banca {
        const banca = new Banca(id)

        banca.setProfessorId(props.professorId)
        banca.setData(props.data)

        banca.notaApresentacao = props.notaApresentacao
        banca.notaTrabalho = props.notaTrabalho

        return banca
    }

    private setProfessorId(id: string): Error | void {
        if (!id)
            throw new InvalidPropsException(
                'Id do Professor não pode ser vazio',
            )
        this.professorId = id
    }

    private setData(data: Date): Error | void {
        //TODO: fazer validação de data
        if (!data) throw new InvalidPropsException('A data não pode ser vazio')
        this.data = data
    }

    getId(): string {
        return this.id
    }

    getProfessorId(): string {
        return this.professorId
    }

    getSegundoProfessorId(): string {
        return this.segundoProfessorId
    }

    getDiaHora(): Date {
        return this.data
    }

    getNotaApresentacao(): number {
        return this.notaApresentacao
    }

    getNotaTrabalho(): number {
        return this.notaTrabalho
    }

    getVersao(): number {
        return this.versao
    }

    avaliarNotaTfg(
        notaApresentacao: number,
        notaTrabalho: number,
    ): Error | void {
        if (!notaApresentacao || notaApresentacao < 0 || notaApresentacao > 10)
            throw new InvalidPropsException('Nota de apresentação inválida')
        if (!notaTrabalho || notaTrabalho < 0 || notaTrabalho > 10)
            throw new InvalidPropsException('Nota de trabalho inválida')

        this.notaApresentacao = notaApresentacao
        this.notaTrabalho = notaTrabalho

        // this.nota_final = Number(
        //     (notaTrabalho * 0.7 + notaApresentacao * 0.3).toFixed(2),
        // )
    }
}
