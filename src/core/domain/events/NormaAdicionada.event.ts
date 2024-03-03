import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface NormaAdicionadaEventProps {
    cursoId: string
    normaId: string
}

export class NormaAdicionadaEvent extends AbstractEvent<NormaAdicionadaEventProps> {
    constructor(props: NormaAdicionadaEventProps) {
        super(NormaAdicionadaEvent.name, props)
    }
}
