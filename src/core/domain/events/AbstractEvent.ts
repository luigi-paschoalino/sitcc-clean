import { IEvent } from '@nestjs/cqrs'

export abstract class AbstractEvent implements IEvent {
    constructor(private readonly name: string, private readonly data: any) {
        this.name = name
        this.data = data
    }
}
