import { AbstractEvent } from './AbstractEvent'

export interface TfgEnviadoEventProps {
    tfgId: string
    path: string
    tipoEntrega: string
}

export class TfgEnviadoEvent extends AbstractEvent<TfgEnviadoEventProps> {
    constructor(props: TfgEnviadoEventProps) {
        super(TfgEnviadoEvent.name, props)
    }
}
