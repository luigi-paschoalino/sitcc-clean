import { AbstractEvent } from './AbstractEvent'

export interface TccNotaParcialAvaliadaEventProps {
    tccId: string
    nota: number
}

export class TccNotaParcialAvaliadaEvent extends AbstractEvent {
    constructor(props: TccNotaParcialAvaliadaEventProps) {
        super(TccNotaParcialAvaliadaEvent.name, props)
    }
}
