import { AbstractEvent } from './AbstractEvent'

export interface TccNotaFinalAvaliadaEventProps {
    bancaId: string
    tccId: string
    notaFinal: number
}

export class TccNotaFinalAvaliadaEvent extends AbstractEvent {
    constructor(props: TccNotaFinalAvaliadaEventProps) {
        super(TccNotaFinalAvaliadaEvent.name, props)
    }
}
