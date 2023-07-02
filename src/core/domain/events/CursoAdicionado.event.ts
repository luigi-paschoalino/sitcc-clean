import { AbstractEvent } from './AbstractEvent'

export interface CursoAdicionadoEventProps {
    universidadeId: string
    institutoId: string
    cursoId: string
}

export class CursoAdicionadoEvent extends AbstractEvent {
    constructor(props: CursoAdicionadoEventProps) {
        super(CursoAdicionadoEvent.name, props)
    }
}
