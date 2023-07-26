import { Exception } from './Exception'

export class RepositoryException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = RepositoryException.name
    }
}
