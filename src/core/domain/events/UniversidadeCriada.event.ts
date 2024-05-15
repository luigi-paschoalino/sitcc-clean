import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

interface UniversidadeCriadaEventProps {
    id: string
    nome: string
}

export class UniversidadeCriadaEvent extends AbstractEvent<UniversidadeCriadaEventProps> {
    constructor(props: UniversidadeCriadaEventProps) {
        super(UniversidadeCriadaEvent.name, props)
    }
}
