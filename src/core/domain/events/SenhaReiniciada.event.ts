import { AbstractEvent } from './AbstractEvent'

export interface SenhaReiniciadaEventProps {
    usuarioId: string
    timestamp: Date
}

export class SenhaReiniciadaEvent extends AbstractEvent {
    constructor(props: SenhaReiniciadaEventProps) {
        super(SenhaReiniciadaEvent.name, props)
    }
}
