import { Logger } from '@nestjs/common'
import { EventPublisher, IEvent } from '@nestjs/cqrs'

interface TccCadastradoEventProps {
    id: string
    titulo: string
}

export class TccCadastradoEvent implements IEvent {
    constructor(props: TccCadastradoEventProps) {}
}
