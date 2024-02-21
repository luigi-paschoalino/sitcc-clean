import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { TfgNotaFinalAvaliadaEvent } from '../../domain/events/TfgNotaFinalEvent.event'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'

@EventsHandler(TfgNotaFinalAvaliadaEvent)
export class CalcularNotaFinalHandler
    implements IEventHandler<TfgNotaFinalAvaliadaEvent>
{
    private logger = new Logger(CalcularNotaFinalHandler.name)
    constructor(
        @Inject('TfgRepository') private readonly tfgRepository: TfgRepository,
    ) {}
    async handle(event: TfgNotaFinalAvaliadaEvent): Promise<Error | void> {
        try {
            const tfg = await this.tfgRepository.buscarTfg(event.data.tfgId)
            if (tfg instanceof Error) throw tfg

            tfg.calcularNotaFinal()
            if (tfg instanceof Error) throw tfg

            const salvar = await this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            this.logger.error(error)
            return error
        }
    }
}
