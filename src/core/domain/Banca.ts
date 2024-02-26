import { BancaException } from '../../shared/domain/exceptions/Banca.exception'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'

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

        banca.professorId = props.professorId
        banca.segundoProfessorId = props.segundoProfessorId
        banca.data = props.data

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
        if (id === this.segundoProfessorId)
            throw new InvalidPropsException(
                'O segundo professor não pode ser o mesmo que o primeiro',
            )

        this.professorId = id
    }

    private setSegundoProfessorId(id: string): Error | void {
        if (!id)
            throw new InvalidPropsException(
                'ID do segundo professor não pode ser vazio',
            )
        if (id === this.professorId)
            throw new InvalidPropsException(
                'O segundo professor não pode ser o mesmo que o primeiro',
            )

        this.segundoProfessorId = id
    }

    private setData(data: Date): Error | void {
        if (!data) throw new InvalidPropsException('A data não pode ser vazia')
        if (new Date(data) < new Date())
            throw new InvalidPropsException('A data não pode ser no passado')

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

    editarBanca(props: {
        professorId?: string
        segundoProfessorId?: string
        data?: Date
    }): Error | void {
        if (props.professorId) this.setProfessorId(props.professorId)
        if (props.segundoProfessorId)
            this.setSegundoProfessorId(props.segundoProfessorId)
        if (props.data) this.setData(props.data)
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

    validarPreenchimentoNotas(): boolean {
        if (
            !this.notaApresentacaoProfessor ||
            !this.notaApresentacaoSegundoProfessor ||
            !this.notaTrabalhoProfessor ||
            !this.notaTrabalhoSegundoProfessor
        )
            return false

        return true
    }

    calcularNotaFinal(): Error | number {
        if (!this.validarPreenchimentoNotas())
            throw new BancaException(
                'As notas da banca não foram totalmente preenchidas',
            )
        // 30% média das notas de apresentação + 70% média das notas de trabalho
        return (
            (0.3 *
                (this.notaApresentacaoProfessor +
                    this.notaApresentacaoSegundoProfessor)) /
                2 +
            (0.7 *
                (this.notaTrabalhoProfessor +
                    this.notaTrabalhoSegundoProfessor)) /
                2
        )
    }
}
