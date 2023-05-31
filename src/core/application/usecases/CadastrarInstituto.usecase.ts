import { Inject } from '@nestjs/common'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { Instituto } from '../../domain/Instituto'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { EventPublisher } from '@nestjs/cqrs'

export interface CadastrarInstitutoUsecaseProps {
    nome: string
    universidadeId: string
}

export class CadastrarInstitutoUsecase {
    constructor(
        private readonly eventPublisher: EventPublisher,
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

            universidade.addInstituto(instituto)

            const salvar = await this.universidadeRepository.salvarUniversidade(
                universidade,
            )

            if (salvar instanceof Error) {
                throw salvar
            }

            this.eventPublisher.mergeObjectContext(universidade)
            universidade.commit()

            return
        } catch (err) {
            return err
        }
    }
}
