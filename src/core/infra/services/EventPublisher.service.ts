import { Injectable, Inject } from '@nestjs/common'
import { AbstractEvent } from '../../../shared/domain/AbstractEvent'
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
            const events =
                aggregate.getUncommittedEvents() as AbstractEvent<any>[]
            if (events.length) {
                for (const event of events)
                    await this.eventRepository.save(event)
                this.eventPublisher.mergeObjectContext(aggregate)
                aggregate.commit()
            }
        } catch (error) {
            throw error
        }
    }
}
