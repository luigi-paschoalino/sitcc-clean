import { Universidade } from '../../domain/Universidade'
import { UniversidadeException } from '../../domain/exceptions/Universidade.exception'
import { Inject } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { EventPublisher } from '@nestjs/cqrs'

export interface CadastrarUniversidadeUsecaseProps {
    nome: string
    institutos: {
        nome: string
    }[]
}

export class CadastrarUniversidadeUsecase {
    constructor(
        private readonly eventPublisher: EventPublisher,
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

            for (const instituto of props.institutos) {
            }

            const uuid = this.uniqueIdService.gerarUuid()

            const universidade = Universidade.criar(props, uuid)

            if (universidade instanceof Error) {
                throw universidade
            }

            const salvar = await this.universidadeRepository.salvarUniversidade(
                universidade,
            )

            if (salvar instanceof Error) throw salvar

            this.eventPublisher.mergeObjectContext(universidade)
            universidade.commit()

            return
        } catch (error) {
            return error
        }
    }
}
