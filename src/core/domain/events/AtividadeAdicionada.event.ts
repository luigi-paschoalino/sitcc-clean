import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface AtividadeAdicionadaEventProps {
    cursoId: string
    cronogramaId: string
}

export class AtividadeAdicionadaEvent extends AbstractEvent<AtividadeAdicionadaEventProps> {
    constructor(props: AtividadeAdicionadaEventProps) {
        super(AtividadeAdicionadaEvent.name, props)
    }
}
