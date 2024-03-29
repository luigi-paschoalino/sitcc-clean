import { AbstractEvent } from './AbstractEvent'

export interface TccOrientacaoAprovadaEventProps {
    id: string
    orientadorId: string
    alunoId: string
}

export class TccOrientacaoAprovadaEvent extends AbstractEvent<TccOrientacaoAprovadaEventProps> {
    constructor(props: TccOrientacaoAprovadaEventProps) {
        super(TccOrientacaoAprovadaEvent.name, props)
    }
}
