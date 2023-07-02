import { IEvent } from '@nestjs/cqrs'

export abstract class AbstractEvent implements IEvent {
    constructor(private readonly name: string, private readonly data: any) {
        this.name = name
        this.data = data
    }

    getName(): string {
        return this.name
    }

    getData(): any {
        return this.data
    }
}
