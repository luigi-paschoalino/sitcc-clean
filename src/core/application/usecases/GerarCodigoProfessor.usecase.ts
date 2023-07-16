import { CodigoProfessor } from '../../domain/CodigoProfessor'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'
import { GerarCodigoService } from '../../domain/services/GerarCodigo.service'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { CodigoProfessorRepository } from '../../domain/repositories/CodigoProfessor.repository'
import { Inject, Logger } from '@nestjs/common'

export class GerarCodigoProfessorUsecase {
    private logger = new Logger(GerarCodigoProfessorUsecase.name)

    constructor(
        @Inject('CodigoProfessorRepository')
        private readonly codigoProfessorRepository: CodigoProfessorRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('GerarCodigoService')
        private readonly gerarCodigoService: GerarCodigoService,
    ) {}

    async execute(): Promise<Error | string> {
        try {
            const id = this.uniqueIdService.gerarUuid()

            const codigo = this.gerarCodigoService.gerarCodigo()

            const codigoProfessor = CodigoProfessor.gerar(codigo, id)

            this.logger.debug(JSON.stringify(codigoProfessor, null, 2))

            const salvar = await this.codigoProfessorRepository.salvarCodigo(
                codigoProfessor,
            )
            if (salvar instanceof Error) throw salvar

            const publish = await this.publisher.publish(codigoProfessor)
            if (publish instanceof Error) throw publish
        } catch (error) {
            return error
        }
    }
}
