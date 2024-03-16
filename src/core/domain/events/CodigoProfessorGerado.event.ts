import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface CodigoProfessorGeradoEventProps {
    id: string
    codigo: string
    email: string
}

export class CodigoProfessorGeradoEvent extends AbstractEvent<CodigoProfessorGeradoEventProps> {
    constructor(props: CodigoProfessorGeradoEventProps) {
        super(CodigoProfessorGeradoEvent.name, props)
    }
}
