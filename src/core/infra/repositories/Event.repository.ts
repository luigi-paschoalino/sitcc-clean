import { Inject, Injectable } from '@nestjs/common'
import { AbstractEvent } from '../../../shared/domain/AbstractEvent'
import { EventRepository } from '../../domain/repositories/Event.repository'
import { EventMapper } from '../mappers/Event.mapper'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'

@Injectable()
export class EventRepositoryImpl implements EventRepository {
    constructor(
        @Inject('PrismaService') private readonly prismaService: PrismaService,
        private readonly eventMapper: EventMapper,
    ) {}

    async save(event: AbstractEvent<any>): Promise<Error | void> {
        try {
            const model = this.eventMapper.domainToModel(event)
            await this.prismaService.eventLog.create({
                data: model,
            })
        } catch (error) {
            throw error
        }
    }
}
