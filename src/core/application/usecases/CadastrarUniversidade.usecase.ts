import { Universidade } from '../../domain/Universidade'
import { UniversidadeException } from '../../domain/exceptions/Universidade.exception'
import { Inject } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'

export interface CadastrarUniversidadeUsecaseProps {
    nome: string
    institutos: {
        nome: string
    }[]
}

export class CadastrarUniversidadeUsecase {
    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
    ) {}

    //TODO: reavaliar se instituto será entidade ou agregado
    async execute(
        props: CadastrarUniversidadeUsecaseProps,
    ): Promise<Error | void> {
        try {
            const universidadeExistente =
                await this.universidadeRepository.buscarPorNome(props.nome)

            if (universidadeExistente instanceof Universidade)
                throw new UniversidadeException(
                    'Já existe uma universidade com esse nome',
                )

            const uuid = this.uniqueIdService.gerarUuid()

            const universidade = Universidade.criar(props, uuid)

            if (universidade instanceof Error) {
                throw universidade
            }

            const salvar = await this.universidadeRepository.salvarUniversidade(
                universidade,
            )

            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(universidade)
        } catch (error) {
            return error
        }
    }
}
