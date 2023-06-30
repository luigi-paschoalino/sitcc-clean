import { Injectable, Inject } from '@nestjs/common'
import { AbstractEvent } from '../../domain/events/AbstractEvent'
import { EventPublisherService } from './../../domain/services/EventPublisher.service'
import { EventPublisher } from '@nestjs/cqrs'

@Injectable()
export class EventPublisherServiceImpl implements EventPublisherService {
    constructor(
        @Inject('EventRepository')
        private readonly eventRepository: EventRepository,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async publish(event: AbstractEvent): Promise<void | Error> {}
}
