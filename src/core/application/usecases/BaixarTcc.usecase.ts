import { Inject, Logger } from '@nestjs/common'
import { TccRepository } from '../../domain/repositories/Tcc.repository'

export class BaixarTccUsecase {
    private logger = new Logger(BaixarTccUsecase.name)

    constructor(
        @Inject('TccRepository') private readonly tccRepository: TccRepository,
    ) {}

    async execute(id: string): Promise<Error | string> {
        try {
            this.logger.log(`Baixando TCC de id: ${id}`)

            const tcc = await this.tccRepository.buscarTcc(id)

            if (tcc instanceof Error) {
                throw tcc
            }

            return tcc.getPath()
        } catch (error) {
            return error
        }
    }
}
