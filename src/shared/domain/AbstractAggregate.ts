import { v4 as uuidv4 } from 'uuid'

export abstract class AbstractAggregate<T extends string = string> {
    private id: T

    protected constructor(id?: T) {
        this.id = id ?? (uuidv4() as T)
    }

    public getId(): T {
        return this.id
    }
}
