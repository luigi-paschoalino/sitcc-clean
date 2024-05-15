import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface BancaEditadaEventProps {
    tfgId: string
    alteracoes: {
        professorId?: string
        segundoProfessorId?: string
        data?: Date
    }
}

export class BancaEditadaEvent extends AbstractEvent<BancaEditadaEventProps> {
    constructor(props: BancaEditadaEventProps) {
        super(BancaEditadaEvent.name, props)
    }
}
