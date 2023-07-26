import { AbstractEvent } from './AbstractEvent'

interface TccCadastradoEventProps {
    id: string
    titulo: string
}

export class TccCadastradoEvent extends AbstractEvent<TccCadastradoEventProps> {
    constructor(props: TccCadastradoEventProps) {
        super(TccCadastradoEvent.name, props)
    }
}
