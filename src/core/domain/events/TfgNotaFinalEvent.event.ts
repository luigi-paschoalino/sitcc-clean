import { AbstractEvent } from './AbstractEvent'

export interface TfgNotaFinalAvaliadaEventProps {
    bancaId: string
    tfgId: string
}

export class TfgNotaFinalAvaliadaEvent extends AbstractEvent<TfgNotaFinalAvaliadaEventProps> {
    constructor(props: TfgNotaFinalAvaliadaEventProps) {
        super(TfgNotaFinalAvaliadaEvent.name, props)
    }
}
