import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface CursoAdicionadoEventProps {
    universidadeId: string
    institutoId: string
    cursoId: string
}

export class CursoAdicionadoEvent extends AbstractEvent<CursoAdicionadoEventProps> {
    constructor(props: CursoAdicionadoEventProps) {
        super(CursoAdicionadoEvent.name, props)
    }
}
