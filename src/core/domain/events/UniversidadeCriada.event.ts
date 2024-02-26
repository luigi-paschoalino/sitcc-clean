import { AbstractEvent } from './AbstractEvent'

interface UniversidadeCriadaEventProps {
    id: string
    nome: string
}

export class UniversidadeCriadaEvent extends AbstractEvent<UniversidadeCriadaEventProps> {
    constructor(props: UniversidadeCriadaEventProps) {
        super(UniversidadeCriadaEvent.name, props)
    }
}
