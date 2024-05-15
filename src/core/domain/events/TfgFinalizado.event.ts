import { STATUS_TFG } from '../Tfg'
import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface TfgFinalizadoEventProps {
    id: string
    status: STATUS_TFG
}

export class TfgFinalizadoEvent extends AbstractEvent<TfgFinalizadoEventProps> {
    constructor(props: TfgFinalizadoEventProps) {
        super(TfgFinalizadoEvent.name, props)
    }
}
