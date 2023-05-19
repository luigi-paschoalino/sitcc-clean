import { Tcc } from '../../domain/Tcc'

export class BuscarTccQuery {
    constructor() {}

    async execute(id: string): Promise<Tcc> {
        const tcc: Tcc = Tcc.criar()
        return tcc
    }
}
