import { Norma } from '../Norma'
import { AbstractEvent } from './AbstractEvent'

export interface NormaAdicionadaEventProps {
    cursoId: string
    norma: Norma
}

export class NormaAdicionadaEvent extends AbstractEvent {
    constructor(props: NormaAdicionadaEventProps) {
        super(NormaAdicionadaEvent.name, props)
    }
}
