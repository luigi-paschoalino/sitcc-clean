import { AbstractEvent } from '../../../shared/domain/AbstractEvent'
import { EventLog as EventModel } from '@prisma/client'

export class EventMapper {
    constructor() {}

    domainToModel(event: AbstractEvent<any>): EventModel {
        return {
            id: event.id,
            eventData: event.data,
            eventName: event.name,
        }
    }
}
