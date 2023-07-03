import { EncriptarSenhaService } from './../../domain/services/EncriptarSenha.service'
import * as bcrypt from 'bcrypt'

export class EncriptarSenhaServiceImpl implements EncriptarSenhaService {
    constructor() {}

    async encriptar(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(senha, salt)
    }

    async comparar(senha: string, senhaHash: string): Promise<boolean> {
        return await bcrypt.compare(senha, senhaHash)
    }
}
