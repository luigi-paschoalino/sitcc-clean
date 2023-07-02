import { AbstractEvent } from './AbstractEvent'

export interface InstitutoAdicionadoEventProps {
    universidadeId: string
    institutoId: string
}

export class InstitutoAdicionadoEvent extends AbstractEvent {
    constructor(props: InstitutoAdicionadoEventProps) {
        super(InstitutoAdicionadoEvent.name, props)
    }
}
