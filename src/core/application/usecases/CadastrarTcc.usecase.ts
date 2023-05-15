export interface CadastrarTccUsecaseProps {
    id: string
    titulo: string
    resumo: string
}

export class CadastrarTccUsecase {
    constructor() {}

    async execute(props: CadastrarTccUsecaseProps): Promise<void> {}
}