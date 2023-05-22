import { Exception } from './Exception'

export class InvalidPropsException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = InvalidPropsException.name
    }
}
