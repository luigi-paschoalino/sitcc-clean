import { AbstractEvent } from './AbstractEvent'

export interface TfgNotaParcialAvaliadaEventProps {
    tccId: string
    nota: number
}

export class TfgNotaParcialAvaliadaEvent extends AbstractEvent<TfgNotaParcialAvaliadaEventProps> {
    constructor(props: TfgNotaParcialAvaliadaEventProps) {
        super(TfgNotaParcialAvaliadaEvent.name, props)
    }
}
