import { Exception } from './Exception'

export class UniversidadeException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = UniversidadeException.name
    }
}
