import { Inject, Logger } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { TIPO_ENTREGA } from '../../../domain/Tfg'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'
import { TfgException } from '../../../../shared/domain/exceptions/Tfg.exception'

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
            this.logger.log(
                `Preparando download da entrega ${props.tipoEntrega.toLocaleLowerCase()} do TFG de id: ${
                    props.id
                }`,
            )

            const tfg = await this.tfgRepository.buscarTfg(props.id)

            if (tfg instanceof Error) {
                throw tfg
            }

            switch (props.tipoEntrega) {
                case TIPO_ENTREGA.PARCIAL:
                    if (!tfg.getPathParcial())
                        throw new TfgException('TFG não possui arquivo parcial')

                    return tfg.getPathParcial()
                case TIPO_ENTREGA.FINAL:
                    if (!tfg.getPathFinal())
                        throw new TfgException('TFG não possui arquivo final')

                    return tfg.getPathFinal()
                default:
                    throw new InvalidPropsException('Tipo de entrega inválido')
            }
        } catch (error) {
            return error
        }
    }
}
