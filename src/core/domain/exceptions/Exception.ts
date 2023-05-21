export abstract class Exception extends Error {
    constructor(message: string, public readonly code: number) {
        super(message)
        this.code = code
        this.name = Exception.name
    }
}
