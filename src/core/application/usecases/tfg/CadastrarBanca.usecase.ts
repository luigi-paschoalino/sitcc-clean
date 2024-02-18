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
    tccId: string
}

export class CadastrarBancaUsecase {
    private logger = new Logger(CadastrarBancaUsecase.name)

    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('TfgRepository')
        private readonly tccRepository: TfgRepository,
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

            const tcc = await this.tccRepository.buscarTfg(props.tccId)

            if (tcc instanceof Error) {
                throw tcc
            }

            this.logger.debug(JSON.stringify(tcc, null, 2))

            tcc.atribuirBanca(banca)

            this.logger.debug(JSON.stringify(tcc, null, 2))

            const salvar = await this.tccRepository.salvarTfg(tcc)

            if (salvar instanceof Error) {
                throw salvar
            }

            await this.publisher.publish(tcc)
        } catch (error) {
            return error
        }
    }
}
