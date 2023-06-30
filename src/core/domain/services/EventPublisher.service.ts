import { AbstractEvent } from '../events/AbstractEvent'

export interface EventPublisherService {
    publish(event: AbstractEvent): Promise<Error | void>
}
