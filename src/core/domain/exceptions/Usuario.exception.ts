import { Exception } from './Exception'

export class UsuarioException extends Exception {
    constructor(message: string) {
        super(message, 400)
        this.name = UsuarioException.name
    }
}
