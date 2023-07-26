import { Exception } from './Exception'

export class TccException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = TccException.name
    }
}
