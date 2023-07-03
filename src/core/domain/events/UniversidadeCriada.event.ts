import { AbstractEvent } from './AbstractEvent'

interface UniversidadeCriadaEventProps {
    id: string
    nome: string
}

//TODO: como pegar um evento disparado e salvar no banco de dados?
export class UniversidadeCriadaEvent extends AbstractEvent {
    constructor(props: UniversidadeCriadaEventProps) {
        super(UniversidadeCriadaEvent.name, props)
    }
}
