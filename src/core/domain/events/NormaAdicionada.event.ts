import { Norma } from "../Normas"

export interface NormaAdicionadaEventProps {
    cursoId: string
    norma: Norma
}

export class NormaAdicionadaEvent {
    constructor(props: NormaAdicionadaEventProps) {}
}