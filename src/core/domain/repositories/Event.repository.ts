import { AbstractEvent } from '../events/AbstractEvent'

export interface EventRepository {
    save(event: AbstractEvent<any>): Promise<void | Error>
}
