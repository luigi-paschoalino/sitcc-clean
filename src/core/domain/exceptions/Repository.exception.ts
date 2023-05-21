import { Exception } from './Exception'

export class RepositoryException extends Exception {
    constructor(message) {
        super(message)
        this.name = RepositoryException.name
    }
}
