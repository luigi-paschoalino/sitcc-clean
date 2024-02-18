import { Inject, Logger } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { Banca } from 'src/core/domain/Banca'
import { TfgRepository } from 'src/core/domain/repositories/Tfg.repository'
import { UniqueIdService } from 'src/core/domain/services/UniqueID.service'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface CadastrarBancaUsecaseProps {
    professorId: string
    segundoProfessorId: string
    dia_hora: Date
    tfgId: string
}

export class CadastrarBancaUsecase {
    private logger = new Logger(CadastrarBancaUsecase.name)

    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
    ) {}

    async execute(props: CadastrarBancaUsecaseProps): Promise<Error | void> {
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const banca = Banca.criar(
                {
                    professorId: props.professorId,
                    data: props.dia_hora,
                    segundoProfessorId: props.segundoProfessorId,
                },
                uuid,
            )

            this.logger.debug(JSON.stringify(banca, null, 2))

            if (banca instanceof Error) {
                throw banca
            }

            const tfg = await this.tfgRepository.buscarTfg(props.tfgId)

            if (tfg instanceof Error) {
                throw tfg
            }

            this.logger.debug(JSON.stringify(tfg, null, 2))

            tfg.atribuirBanca(banca)

            this.logger.debug(JSON.stringify(tfg, null, 2))

            const salvar = await this.tfgRepository.salvarTfg(tfg)

            if (salvar instanceof Error) {
                throw salvar
            }

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}
