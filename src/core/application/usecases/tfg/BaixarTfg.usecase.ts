import { Inject, Logger } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'

export class BaixarTccUsecase {
    private logger = new Logger(BaixarTccUsecase.name)

    constructor(
        @Inject('TfgRepository') private readonly tccRepository: TfgRepository,
    ) {}

    async execute(id: string): Promise<Error | string> {
        try {
            this.logger.log(`Baixando TCC de id: ${id}`)

            const tcc = await this.tccRepository.buscarTfg(id)

            if (tcc instanceof Error) {
                throw tcc
            }

            return tcc.getPath()
        } catch (error) {
            return error
        }
    }
}
