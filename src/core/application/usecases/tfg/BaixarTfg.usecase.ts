import { Inject, Logger } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { TIPO_ENTREGA } from '../../../domain/Tfg'

export interface BaixarTfgUsecaseProps {
    id: string
    tipoEntrega: TIPO_ENTREGA
}

export class BaixarTfgUsecase {
    private logger = new Logger(BaixarTfgUsecase.name)

    constructor(
        @Inject('TfgRepository') private readonly tfgRepository: TfgRepository,
    ) {}

    async execute(props: BaixarTfgUsecaseProps): Promise<Error | string> {
        try {
            this.logger.log(`Baixando TFG de id: ${props.id}`)

            const tfg = await this.tfgRepository.buscarTfg(props.id)

            if (tfg instanceof Error) {
                throw tfg
            }

            return props.tipoEntrega === TIPO_ENTREGA.PARCIAL
                ? tfg.getPathParcial()
                : tfg.getPathFinal()
        } catch (error) {
            return error
        }
    }
}
