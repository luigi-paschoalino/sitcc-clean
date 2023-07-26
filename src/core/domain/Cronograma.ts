import { Atividade } from './Atividades'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface CriarCronogramaProps {
    ano: number
    semestre: ENUM_SEMESTRE
}

export enum ENUM_SEMESTRE {
    PRIMEIRO = '1',
    SEGUNDO = '2',
}

export class Cronograma {
    private id: string
    private ano: number
    private semestre: ENUM_SEMESTRE
    private atividades?: Atividade[]

    private constructor(id: string) {
        this.id = id
    }

    static criar(props: CriarCronogramaProps, id: string): Cronograma {
        const instance = new Cronograma(id)

        instance.setAno(props.ano)
        instance.setSemestre(props.semestre)

        return instance
    }

    private setAno(ano: number): void {
        this.ano = ano
    }

    private setSemestre(semestre: ENUM_SEMESTRE): void {
        if (!semestre) throw new InvalidPropsException('Semestre não informado')
        if (!Object.values(ENUM_SEMESTRE).includes(semestre))
            throw new InvalidPropsException('Semestre inválido')
        this.semestre = semestre
    }

    getId(): string {
        return this.id
    }

    getAno(): number {
        return this.ano
    }

    getSemestre(): ENUM_SEMESTRE {
        return this.semestre
    }

    getAtividades(): Atividade[] {
        return this.atividades
    }
}
