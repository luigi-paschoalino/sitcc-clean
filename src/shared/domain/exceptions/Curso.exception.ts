import { Exception } from './Exception'

export class CursoException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = CursoException.name
    }
}
