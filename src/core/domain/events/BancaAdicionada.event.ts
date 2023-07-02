import { AbstractEvent } from './AbstractEvent'

export interface BancaAdicionadaEventProps {
    tccId: string
    bancaId: string
}

export class BancaAdicionadaEvent extends AbstractEvent {
    constructor(props: BancaAdicionadaEventProps) {
        super(BancaAdicionadaEvent.name, props)
    }
}
