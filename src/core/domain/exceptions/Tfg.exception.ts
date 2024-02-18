import { Exception } from './Exception'

export class TfgException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = TfgException.name
    }
}
