import { AbstractEvent } from './AbstractEvent'

export interface TfgNotaParcialAvaliadaEventProps {
    tfgId: string
    nota: number
}

export class TfgNotaParcialAvaliadaEvent extends AbstractEvent<TfgNotaParcialAvaliadaEventProps> {
    constructor(props: TfgNotaParcialAvaliadaEventProps) {
        super(TfgNotaParcialAvaliadaEvent.name, props)
    }
}
