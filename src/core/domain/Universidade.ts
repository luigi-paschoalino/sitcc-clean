import { AggregateRoot } from '@nestjs/cqrs'

export class Universidade extends AggregateRoot {
    constructor() {
        super()
    }
}
