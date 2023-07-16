import { AbstractEvent } from './AbstractEvent'

export interface TccEnviadoEventProps {
    tccId: string
    path: string
    tipoEntrega: string
}

export class TccEnviadoEvent extends AbstractEvent {
    constructor(props: TccEnviadoEventProps) {
        super(TccEnviadoEvent.name, props)
    }
}
