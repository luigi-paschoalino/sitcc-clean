import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarBancaProps {
    professorId: string
    dia_hora: Date
}

export interface CarregarBancaProps {
    professorId: string
    dia_hora: Date
    nota_final: number
    nota_apresentacao: number
    nota_trabalho: number
}

export class Banca {
    private id: string
    private id_professor: string
    private dia_hora: Date
    private nota_final: number
    private nota_apresentacao: number
    private nota_trabalho: number

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarBancaProps, id: string): Banca {
        const banca = new Banca(id)

        banca.setIdProfessor(props.professorId)
        banca.setDiaHora(props.dia_hora)

        return banca
    }

    static carregar(props: CarregarBancaProps, id: string): Banca {
        const banca = new Banca(id)

        banca.setIdProfessor(props.professorId)
        banca.setDiaHora(props.dia_hora)

        banca.nota_apresentacao = props.nota_apresentacao
        banca.nota_trabalho = props.nota_trabalho
        banca.nota_final = props.nota_final

        return banca
    }

    private setIdProfessor(id: string): Error | void {
        if (!id)
            throw new InvalidPropsException(
                'Id do Professor não pode ser vazio',
            )
        this.id_professor = id
    }

    private setDiaHora(dia: Date): Error | void {
        //TODO: fazer validação de data
        if (!dia) throw new InvalidPropsException('A data não pode ser vazio')
        this.dia_hora = dia
    }

    getId(): string {
        return this.id
    }

    getIdProfessor(): string {
        return this.id_professor
    }

    getDiaHora(): Date {
        return this.dia_hora
    }

    getNotaFinal(): number {
        return this.nota_final
    }

    getNotaApresentacao(): number {
        return this.nota_apresentacao
    }

    getNotaTrabalho(): number {
        return this.nota_trabalho
    }

    avaliarNotaTcc(
        notaApresentacao: number,
        notaTrabalho: number,
    ): Error | void {
        if (!notaApresentacao || notaApresentacao < 0 || notaApresentacao > 10)
            throw new InvalidPropsException('Nota de apresentação inválida')
        if (!notaTrabalho || notaTrabalho < 0 || notaTrabalho > 10)
            throw new InvalidPropsException('Nota de trabalho inválida')

        this.nota_apresentacao = notaApresentacao
        this.nota_trabalho = notaTrabalho

        this.nota_final = Number(
            (notaTrabalho * 0.7 + notaApresentacao * 0.3).toFixed(2),
        )
    }
}
