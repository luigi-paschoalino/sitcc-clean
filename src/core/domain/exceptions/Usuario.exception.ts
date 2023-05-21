import { Exception } from './Exception'

export class UsuarioException extends Exception {
    constructor(message: string) {
        super(message)
        this.name = UsuarioException.name
    }
}
