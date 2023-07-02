import { AbstractEvent } from './AbstractEvent'

export interface TccOrientacaoReprovadaEventProps {
    id: string
    orientadorId: string
    alunoId: string
    justificativa: string
}

export class TccOrientacaoReprovadaEvent extends AbstractEvent {
    constructor(props: TccOrientacaoReprovadaEventProps) {
        super(TccOrientacaoReprovadaEvent.name, props)
    }
}
