import { Logger } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

export class TccCadastradoEvent {
    private logger = new Logger(TccCadastradoEvent.name)

    constructor() {}
}
