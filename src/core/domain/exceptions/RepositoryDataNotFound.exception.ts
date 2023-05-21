import { Exception } from './Exception'

export class RepositoryDataNotFoundException extends Exception {
    constructor(message) {
        super(message)
        this.name = RepositoryDataNotFoundException.name
    }
}
