import { Atividade, TIPO_ATIVIDADE } from './Atividades'
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

    adicionarAtividade(atividade: Atividade): Error | void {
        this.atividades.push(atividade)

        const validar = this.validarAtividades()
        if (validar instanceof Error) return validar
    }

    editarAtividade(atividade: Atividade): Error | void {
        const index = this.atividades.findIndex(
            (a) => a.getId() === atividade.getId(),
        )
        if (index === -1)
            return new InvalidPropsException('Atividade não encontrada')

        this.atividades.splice(index, 1, atividade)

        const validar = this.validarAtividades()
        if (validar instanceof Error) return validar
    }

    removerAtividade(atividadeId: string): Error | void {
        const index = this.atividades.findIndex(
            (a) => a.getId() === atividadeId,
        )
        if (index === -1)
            return new InvalidPropsException('Atividade não encontrada')

        this.atividades.splice(index, 1)
    }

    validarAtividades(): Error | void {
        if (!this.atividades) return

        // Validar se existe nenhuma ou apenas uma instância de cada tipo de atividade
        const tipos = this.atividades.map((a) => a.getTitulo())
        const tiposUnicos = [...new Set(tipos)]

        // Buscar duplicatas
        const duplicatas = tiposUnicos.filter(
            (t) => tipos.filter((t2) => t2 === t).length > 1,
        )
        if (duplicatas.length)
            return new InvalidPropsException(
                `A seguinte atividade está duplicada: ${duplicatas.join(', ')}`,
            )

        // Validar se nenhuma etapa foi pulada
        if (
            this.atividades.find(
                (a) =>
                    a.getTitulo() === TIPO_ATIVIDADE.ENTREGA_FINAL &&
                    !this.atividades.find(
                        (a) => a.getTitulo() === TIPO_ATIVIDADE.ENTREGA_PARCIAL,
                    ),
            )
        )
            return new InvalidPropsException(
                'E necessário cadastrar a entrega parcial antes da entrega final',
            )

        if (
            this.atividades.find(
                (a) =>
                    a.getTitulo() === TIPO_ATIVIDADE.DATA_DEFESA &&
                    !this.atividades.find(
                        (a) => a.getTitulo() === TIPO_ATIVIDADE.ENTREGA_FINAL,
                    ),
            )
        )
            return new InvalidPropsException(
                'E necessário cadastrar a entrega final antes da data de defesa',
            )

        // Validar se as datas estão em ordem
        const entregaParcial = this.atividades.find(
            (a) => a.getTitulo() === TIPO_ATIVIDADE.ENTREGA_PARCIAL,
        )
        const entregaFinal = this.atividades.find(
            (a) => a.getTitulo() === TIPO_ATIVIDADE.ENTREGA_FINAL,
        )
        const dataDefesa = this.atividades.find(
            (a) => a.getTitulo() === TIPO_ATIVIDADE.DATA_DEFESA,
        )
        if (
            entregaParcial &&
            entregaFinal &&
            entregaFinal.getData() < entregaParcial.getData()
        ) {
            return new InvalidPropsException(
                'Data de entrega final anterior à data de entrega parcial',
            )
        }

        if (
            entregaFinal &&
            dataDefesa &&
            dataDefesa.getData() < entregaFinal.getData()
        ) {
            return new InvalidPropsException(
                'Data de defesa anterior à data de entrega final',
            )
        }
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
