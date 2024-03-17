import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface SenhaReiniciadaEventProps {
    email: string
    hash: string
    timestamp: Date
}

export class SenhaReiniciadaEvent extends AbstractEvent<SenhaReiniciadaEventProps> {
    constructor(props: SenhaReiniciadaEventProps) {
        super(SenhaReiniciadaEvent.name, props)
    }
}
