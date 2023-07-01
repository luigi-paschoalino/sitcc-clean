import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarBancaProps {
    professorId: string
    dia_hora: Date
}

export class Banca {
    private id: string
    private id_professor: string
    private id_tcc: string
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

    private setIdProfessor(id: string) {
        if (!id)
            throw new InvalidPropsException(
                'Id do Professor não pode ser vazio',
            )
        this.id_professor = this.id_professor
    }

    private setIdTcc(id: string) {
        if (!id) throw new InvalidPropsException('Id do TCC não pode ser vazio')
        this.id_tcc = this.id_tcc
    }

    private setDiaHora(dia: Date) {
        //TODO: fazer validação de data
        if (!dia) throw new InvalidPropsException('A data não pode ser vazio')
        this.dia_hora = this.dia_hora
    }

    getId(): string {
        return this.id
    }

    getIdProfessor(): string {
        return this.id_professor
    }

    getIdTcc(): string {
        return this.id_tcc
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
}
