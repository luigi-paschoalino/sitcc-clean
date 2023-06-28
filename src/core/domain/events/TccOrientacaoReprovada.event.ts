export interface TccOrientacaoReprovadaEventProps {
    id: string
    orientadorId: string
    alunoId: string
    justificativa: string
}

export class TccOrientacaoReprovadaEvent {
    constructor(props: TccOrientacaoReprovadaEventProps) {}
}
