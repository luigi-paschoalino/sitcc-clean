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
    notaApresentacaoProfessor: number
    notaApresentacaoSegundoProfessor: number
    notaTrabalhoProfessor: number
    notaTrabalhoSegundoProfessor: number
}

export class Banca {
    private id: string
    private professorId: string
    private segundoProfessorId: string
    private data: Date
    private notaApresentacaoProfessor: number
    private notaApresentacaoSegundoProfessor: number
    private notaTrabalhoProfessor: number
    private notaTrabalhoSegundoProfessor: number

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarBancaProps, id: string): Banca {
        const banca = new Banca(id)

        if (props.segundoProfessorId === props.professorId)
            throw new InvalidPropsException(
                'O segundo professor não pode ser o mesmo que o primeiro',
            )

        banca.setProfessorId(props.professorId)
        banca.setSegundoProfessorId(props.segundoProfessorId)
        banca.setData(props.data)

        return banca
    }

    static carregar(props: CarregarBancaProps, id: string): Banca {
        const banca = new Banca(id)

        banca.setProfessorId(props.professorId)
        banca.setSegundoProfessorId(props.segundoProfessorId)
        banca.setData(props.data)

        banca.notaApresentacaoProfessor = props.notaApresentacaoProfessor
        banca.notaApresentacaoSegundoProfessor =
            props.notaApresentacaoSegundoProfessor
        banca.notaTrabalhoProfessor = props.notaTrabalhoProfessor
        banca.notaTrabalhoSegundoProfessor = props.notaTrabalhoSegundoProfessor

        return banca
    }

    private setProfessorId(id: string): Error | void {
        if (!id)
            throw new InvalidPropsException(
                'ID do professor não pode ser vazio',
            )
        this.professorId = id
    }

    private setSegundoProfessorId(id: string): Error | void {
        if (!id)
            throw new InvalidPropsException(
                'ID do segundo professor não pode ser vazio',
            )
        this.segundoProfessorId = id
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

    getNotaApresentacaoProfessor(): number {
        return this.notaApresentacaoProfessor
    }

    getNotaApresentacaoSegundoProfessor(): number {
        return this.notaApresentacaoSegundoProfessor
    }

    getNotaTrabalhoProfessor(): number {
        return this.notaTrabalhoProfessor
    }

    getNotaTrabalhoSegundoProfessor(): number {
        return this.notaTrabalhoSegundoProfessor
    }

    avaliarNotaTfg(
        professorId: string,
        notaApresentacao: number,
        notaTrabalho: number,
    ): Error | void {
        if (
            professorId !== this.professorId &&
            professorId !== this.segundoProfessorId
        )
            throw new InvalidPropsException('Professor não pertence à banca')
        if (!notaApresentacao || notaApresentacao < 0 || notaApresentacao > 10)
            throw new InvalidPropsException('Nota de apresentação inválida')
        if (!notaTrabalho || notaTrabalho < 0 || notaTrabalho > 10)
            throw new InvalidPropsException('Nota de trabalho inválida')

        professorId === this.professorId
            ? (this.notaApresentacaoProfessor = notaApresentacao)
            : (this.notaApresentacaoSegundoProfessor = notaApresentacao)
        professorId === this.professorId
            ? (this.notaTrabalhoProfessor = notaTrabalho)
            : (this.notaTrabalhoSegundoProfessor = notaTrabalho)
    }
}
