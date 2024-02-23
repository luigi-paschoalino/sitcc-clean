import { IEvent } from '@nestjs/cqrs'

export abstract class AbstractEvent<T> implements IEvent {
    constructor(readonly name: string, readonly data: T, readonly id?: string) {
        this.id = id
        this.name = name
        this.data = data
    }
}
