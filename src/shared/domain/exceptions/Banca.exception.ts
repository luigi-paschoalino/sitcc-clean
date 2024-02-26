import { Exception } from './Exception'

export class BancaException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = BancaException.name
    }
}
