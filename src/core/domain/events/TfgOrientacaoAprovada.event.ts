import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface TfgOrientacaoAprovadaEventProps {
    id: string
    orientadorId: string
    alunoId: string
    titulo: string
}

export class TfgOrientacaoAprovadaEvent extends AbstractEvent<TfgOrientacaoAprovadaEventProps> {
    constructor(props: TfgOrientacaoAprovadaEventProps) {
        super(TfgOrientacaoAprovadaEvent.name, props)
    }
}
