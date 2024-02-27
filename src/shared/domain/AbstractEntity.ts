import { v4 as uuidv4 } from 'uuid'

export abstract class AbstractEntity<T extends string = string> {
    protected id: T

    protected constructor(id?: T) {
        this.id = id ?? (uuidv4() as T)
    }

    public getId(): T {
        return this.id
    }
}
