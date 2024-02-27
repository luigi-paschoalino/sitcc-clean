import { Atividade } from './Atividades'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'
import { AbstractEntity } from '../../shared/domain/AbstractEntity'

export interface CriarCronogramaProps {
    ano: number
    semestre: SEMESTRE
}

export interface CarregarCronogramaProps {
    ano: number
    semestre: SEMESTRE
    atividades?: Atividade[]
}

export enum SEMESTRE {
    PRIMEIRO = 'PRIMEIRO',
    SEGUNDO = 'SEGUNDO',
}

export class Cronograma extends AbstractEntity {
    private ano: number
    private semestre: SEMESTRE
    private atividades?: Atividade[]

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarCronogramaProps): Cronograma {
        const instance = new Cronograma()

        instance.setAno(props.ano)
        instance.setSemestre(props.semestre)

        return instance
    }

    static carregar(props: CarregarCronogramaProps, id: string): Cronograma {
        const instance = new Cronograma(id)

        instance.setAno(props.ano)
        instance.setSemestre(props.semestre)
        instance.setAtividades(props.atividades)

        return instance
    }

    private setAno(ano: number): void {
        this.ano = ano
    }

    private setSemestre(semestre: SEMESTRE): void {
        if (!semestre) throw new InvalidPropsException('Semestre não informado')
        if (!Object.values(SEMESTRE).includes(semestre))
            throw new InvalidPropsException('Semestre inválido')
        this.semestre = semestre
    }

    private setAtividades(atividades: Atividade[] = []): void {
        this.atividades = atividades
    }

    getAno(): number {
        return this.ano
    }

    getSemestre(): SEMESTRE {
        return this.semestre
    }

    getAtividades(): Atividade[] {
        return this.atividades
    }
}
