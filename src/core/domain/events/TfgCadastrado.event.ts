import { AbstractEvent } from './AbstractEvent'

export interface TfgCadastradoEventProps {
    id: string
    titulo: string
}

export class TfgCadastradoEvent extends AbstractEvent<TfgCadastradoEventProps> {
    constructor(props: TfgCadastradoEventProps) {
        super(TfgCadastradoEvent.name, props)
    }
}
