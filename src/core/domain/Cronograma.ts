export interface CriarCronogramaProps {
    ano: number
    semestre: ENUM_SEMESTRE
}

export class Cronograma {
    private id: string
    private ano: number
    private semestre: ENUM_SEMESTRE

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
}

export enum ENUM_SEMESTRE {
    PRIMEIRO = '1',
    SEGUNDO = '2',
}
