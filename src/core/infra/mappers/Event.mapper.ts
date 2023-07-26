import { Injectable } from '@nestjs/common'
import { AbstractEvent } from '../../domain/events/AbstractEvent'
import { EventModel } from '../models/Event.model'

export class EventMapper {
    constructor() {}

    domainToModel(event: AbstractEvent<any>): EventModel {
        const model = new EventModel()
        model.eventName = event.name
        model.eventData = event.data
        return model
    }
}
