import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarBancaProps {
    id_professor: string
    id_tcc: string
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
        banca.setIdProfessor(props.id_professor)
        banca.setIdTcc(props.id_tcc)
        banca.setDia(props.dia_hora)

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

    private setDia(dia: Date) {
        //TODO: fazer validação de data
        if (!dia) throw new InvalidPropsException('A data não pode ser vazio')
        this.dia_hora = this.dia_hora
    }
}
