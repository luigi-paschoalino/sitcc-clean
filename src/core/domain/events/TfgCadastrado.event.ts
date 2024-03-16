import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface TfgCadastradoEventProps {
    id: string
    titulo: string
    alunoNome: string
    alunoEmail: string
    orientadorNome: string
    orientadorEmail: string
    coorientadorNome?: string
    coorientadorEmail?: string
}

export class TfgCadastradoEvent extends AbstractEvent<TfgCadastradoEventProps> {
    constructor(props: TfgCadastradoEventProps) {
        super(TfgCadastradoEvent.name, props)
    }
}
