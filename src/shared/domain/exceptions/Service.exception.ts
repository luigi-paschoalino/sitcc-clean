import { Exception } from './Exception'

export class ServiceException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = ServiceException.name
    }
}
