import { AbstractEvent } from '../../../shared/domain/AbstractEvent'

export interface EventRepository {
    save(event: AbstractEvent<any>): Promise<void | Error>
}
