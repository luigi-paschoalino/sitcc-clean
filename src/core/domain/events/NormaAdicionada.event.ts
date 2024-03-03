import { Norma } from '../Norma'
import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface NormaAdicionadaEventProps {
    cursoId: string
    norma: Norma
}

export class NormaAdicionadaEvent extends AbstractEvent<NormaAdicionadaEventProps> {
    constructor(props: NormaAdicionadaEventProps) {
        super(NormaAdicionadaEvent.name, props)
    }
}
