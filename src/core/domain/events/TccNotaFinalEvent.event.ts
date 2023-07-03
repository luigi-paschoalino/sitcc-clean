import { AbstractEvent } from './AbstractEvent'

export interface TccNotaFinalAvaliadaEventProps {
    tccId: string
    nota: number
}

export class TccNotaFinalAvaliadaEvent extends AbstractEvent {
    constructor(props: TccNotaFinalAvaliadaEventProps) {
        super(TccNotaFinalAvaliadaEvent.name, props)
    }
}
