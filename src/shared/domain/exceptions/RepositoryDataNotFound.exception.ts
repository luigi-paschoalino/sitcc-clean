import { Exception } from './Exception'

export class RepositoryDataNotFoundException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = RepositoryDataNotFoundException.name
    }
}
