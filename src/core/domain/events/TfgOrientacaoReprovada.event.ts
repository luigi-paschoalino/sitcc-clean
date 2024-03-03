import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface TfgOrientacaoReprovadaEventProps {
    id: string
    orientadorId: string
    alunoId: string
    justificativa: string
}

export class TfgOrientacaoReprovadaEvent extends AbstractEvent<TfgOrientacaoReprovadaEventProps> {
    constructor(props: TfgOrientacaoReprovadaEventProps) {
        super(TfgOrientacaoReprovadaEvent.name, props)
    }
}
