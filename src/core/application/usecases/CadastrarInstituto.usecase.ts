import { Inject, Logger } from '@nestjs/common'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { Instituto } from '../../domain/Instituto'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'

export interface CadastrarInstitutoUsecaseProps {
    nome: string
    universidadeId: string
}

export class CadastrarInstitutoUsecase {
    private logger = new Logger(CadastrarInstitutoUsecase.name)

    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    async execute(
        props: CadastrarInstitutoUsecaseProps,
    ): Promise<Error | void> {
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const instituto = Instituto.criar(
                {
                    nome: props.nome,
                },
                uuid,
            )

            if (instituto instanceof Error) {
                throw instituto
            }

            const universidade = await this.universidadeRepository.buscarPorId(
                props.universidadeId,
            )

            if (universidade instanceof Error) {
                throw universidade
            }

            const addInstituto = universidade.addInstituto(instituto)

            if (addInstituto instanceof Error) {
                throw addInstituto
            }

            const salvar = await this.universidadeRepository.salvarUniversidade(
                universidade,
            )

            if (salvar instanceof Error) {
                throw salvar
            }

            await this.publisher.publish(universidade)
        } catch (err) {
            return err
        }
    }
}
