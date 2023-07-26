import { Injectable } from '@nestjs/common'
import { AbstractEvent } from '../../domain/events/AbstractEvent'
import { EventRepository } from '../../domain/repositories/Event.repository'
import { EventMapper } from '../mappers/Event.mapper'

@Injectable()
export class EventRepositoryImpl implements EventRepository {
    constructor(private readonly eventMapper: EventMapper) {}

    async save(event: AbstractEvent<any>): Promise<Error | void> {
        try {
            const model = this.eventMapper.domainToModel(event)
            await model.save()
        } catch (error) {
            throw error
        }
    }
}
