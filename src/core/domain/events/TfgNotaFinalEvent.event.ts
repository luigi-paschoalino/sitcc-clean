import { AbstractEvent } from './AbstractEvent'

export interface TfgNotaFinalAvaliadaEventProps {
    tfgId: string
}

export class TfgNotaFinalAvaliadaEvent extends AbstractEvent<TfgNotaFinalAvaliadaEventProps> {
    constructor(props: TfgNotaFinalAvaliadaEventProps) {
        super(TfgNotaFinalAvaliadaEvent.name, props)
    }
}
