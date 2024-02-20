import { TIPO_ENTREGA } from '../Tfg'
import { AbstractEvent } from './AbstractEvent'

export interface TfgEnviadoEventProps {
    tfgId: string
    path: string
    tipoEntrega: TIPO_ENTREGA
}

export class TfgEnviadoEvent extends AbstractEvent<TfgEnviadoEventProps> {
    constructor(props: TfgEnviadoEventProps) {
        super(TfgEnviadoEvent.name, props)
    }
}
