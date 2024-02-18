import { Inject, Logger } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'

export class BaixarTfgUsecase {
    private logger = new Logger(BaixarTfgUsecase.name)

    constructor(
        @Inject('TfgRepository') private readonly tfgRepository: TfgRepository,
    ) {}

    async execute(id: string): Promise<Error | string> {
        try {
            this.logger.log(`Baixando TFG de id: ${id}`)

            const tfg = await this.tfgRepository.buscarTfg(id)

            if (tfg instanceof Error) {
                throw tfg
            }

            return tfg.getPath()
        } catch (error) {
            return error
        }
    }
}
