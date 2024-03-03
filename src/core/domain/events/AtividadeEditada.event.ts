import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface AtividadeEditadaEventProps {
    cursoId: string
    cronogramaId: string
    atividadeId: string
}

export class AtividadeEditadaEvent extends AbstractEvent<AtividadeEditadaEventProps> {
    constructor(props: AtividadeEditadaEventProps) {
        super(AtividadeEditadaEvent.name, props)
    }
}
