export interface CursoAdicionadoEventProps {
    universidadeId: string
    institutoId: string
    cursoId: string
}

export class CursoAdicionadoEvent {
    constructor(props: CursoAdicionadoEventProps) {}
}
