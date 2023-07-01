import { Inject, Logger } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { Banca } from 'src/core/domain/Banca'
import { TccRepository } from 'src/core/domain/repositories/Tcc.repository'
import { UniqueIdService } from 'src/core/domain/services/UniqueID.service'

export interface CadastrarBancaUsecaseProps {
    professorId: string
    dia_hora: Date
    tccId: string
}

export class CadastrarBancaUsecase {
    //private logger = new Logger(CadastrarBancaUsecase.name)
    //TODO: logger cadastra banca
    constructor(
        private readonly eventPublisher: EventPublisher,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('TccRepository')
        private readonly tccRepository: TccRepository,
    ) {}

    async execute(props: CadastrarBancaUsecaseProps): Promise<Error | void> {
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const banca = Banca.criar(
                {
                    professorId: props.professorId,
                    dia_hora: props.dia_hora,
                },
                uuid,
            )

            if (banca instanceof Error) {
                throw banca
            }

            const tcc = await this.tccRepository.buscarTcc(props.tccId)

            if (tcc instanceof Error) {
                throw tcc
            }

            tcc.atribuirBanca(banca)

            const salvar = await this.tccRepository.salvarTcc(tcc)

            if (salvar instanceof Error) {
                throw salvar
            }

            this.eventPublisher.mergeObjectContext(tcc)
            tcc.commit()
        } catch (error) {
            return error
        }
    }
}
