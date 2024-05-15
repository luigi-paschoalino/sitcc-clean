import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { TfgNotaFinalAvaliadaEvent } from '../../domain/events/TfgNotaFinalAvaliada.event'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'
import { TfgFinalizadoEvent } from '../../domain/events/TfgFinalizado.event'

@EventsHandler(TfgNotaFinalAvaliadaEvent)
export class CalcularNotaFinalHandler
    implements IEventHandler<TfgNotaFinalAvaliadaEvent>
{
    private logger = new Logger(CalcularNotaFinalHandler.name)
    constructor(
        @Inject('TfgRepository') private readonly tfgRepository: TfgRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}
    async handle(event: TfgNotaFinalAvaliadaEvent): Promise<Error | void> {
        try {
            const tfg = await this.tfgRepository.buscarTfg(event.data.tfgId)
            if (tfg instanceof Error) throw tfg

            tfg.calcularNotaFinal()
            if (tfg instanceof Error) throw tfg

            tfg.apply(
                new TfgFinalizadoEvent({
                    id: tfg.getId(),
                    status: tfg.getStatus(),
                }),
            )

            const salvar = await this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            this.logger.error(error)
            return error
        }
    }
}
