import { Norma } from '../Norma'

export interface NormaAdicionadaEventProps {
    cursoId: string
    norma: Norma
}

export class NormaAdicionadaEvent {
    constructor(props: NormaAdicionadaEventProps) {}
}
