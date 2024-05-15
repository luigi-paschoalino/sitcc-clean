import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface InstitutoAdicionadoEventProps {
    universidadeId: string
    institutoId: string
}

export class InstitutoAdicionadoEvent extends AbstractEvent<InstitutoAdicionadoEventProps> {
    constructor(props: InstitutoAdicionadoEventProps) {
        super(InstitutoAdicionadoEvent.name, props)
    }
}
