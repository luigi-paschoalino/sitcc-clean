import { Injectable, Inject } from '@nestjs/common'
import { AbstractEvent } from '../../domain/events/AbstractEvent'
import { EventPublisherService } from './../../domain/services/EventPublisher.service'
import { AggregateRoot, EventPublisher } from '@nestjs/cqrs'
import { EventRepository } from '../../domain/repositories/Event.repository'

@Injectable()
export class EventPublisherServiceImpl implements EventPublisherService {
    constructor(
        @Inject('EventRepository')
        private readonly eventRepository: EventRepository,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async publish(aggregate: AggregateRoot): Promise<void | Error> {
        try {
            const events = aggregate.getUncommittedEvents()
            if (!!events.length) {
                for (const event of events)
                    await this.eventRepository.save(event as AbstractEvent<any>)
                this.eventPublisher.mergeObjectContext(aggregate)
                aggregate.commit()
            }
        } catch (error) {
            throw error
        }
    }
}
