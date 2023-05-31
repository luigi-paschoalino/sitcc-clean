import { CommandHandler, EventBus } from '@nestjs/cqrs'
import { Tcc } from '../../domain/Tcc'

export interface CadastrarTccUsecaseProps {
    id: string
    titulo: string
    resumo: string
}

export class CadastrarTccUsecase {
    constructor(private eventBus?: EventBus) {}

    async execute(props: CadastrarTccUsecaseProps): Promise<Tcc> {
        const tcc = Tcc.criar()
        return tcc
    }
}
