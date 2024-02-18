import { AbstractEvent } from './AbstractEvent'

export interface BancaAdicionadaEventProps {
    tfgId: string
    bancaId: string
}

export class BancaAdicionadaEvent extends AbstractEvent<BancaAdicionadaEventProps> {
    constructor(props: BancaAdicionadaEventProps) {
        super(BancaAdicionadaEvent.name, props)
    }
}
