import { AggregateRoot } from '@nestjs/cqrs'

export interface EventPublisherService {
    publish(aggregate: AggregateRoot): Promise<Error | void>
}
