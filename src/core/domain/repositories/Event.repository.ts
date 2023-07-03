import { AbstractEvent } from '../events/AbstractEvent'

export interface EventRepository {
    save(event: AbstractEvent): Promise<void | Error>
}
