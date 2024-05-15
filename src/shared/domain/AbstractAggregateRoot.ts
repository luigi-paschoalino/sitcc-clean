import { AggregateRoot } from '@nestjs/cqrs'
import { v4 as uuidv4 } from 'uuid'

export abstract class AbstractAggregateRoot<
    T extends string = string,
> extends AggregateRoot {
    protected id: T

    protected constructor(id?: T) {
        super()
        this.id = id ?? (uuidv4() as T)
    }

    public getId(): T {
        return this.id
    }
}
