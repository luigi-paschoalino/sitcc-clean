import { AbstractEvent } from './AbstractEvent'

export interface SenhaReiniciadaEventProps {
    usuarioId: string
    timestamp: Date
}

export class SenhaReiniciadaEvent extends AbstractEvent<SenhaReiniciadaEventProps> {
    constructor(props: SenhaReiniciadaEventProps) {
        super(SenhaReiniciadaEvent.name, props)
    }
}
