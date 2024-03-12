import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface TfgOrientacaoRecusadaEventProps {
    id: string
    orientadorId: string
    alunoId: string
    justificativa: string
}

export class TfgOrientacaoRecusadaEvent extends AbstractEvent<TfgOrientacaoRecusadaEventProps> {
    constructor(props: TfgOrientacaoRecusadaEventProps) {
        super(TfgOrientacaoRecusadaEvent.name, props)
    }
}
