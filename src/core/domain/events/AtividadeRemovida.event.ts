import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface AtividadeRemovidaEventProps {
    cursoId: string
    cronogramaId: string
}

export class AtividadeRemovidaEvent extends AbstractEvent<AtividadeRemovidaEventProps> {
    constructor(props: AtividadeRemovidaEventProps) {
        super(AtividadeRemovidaEvent.name, props)
    }
}
