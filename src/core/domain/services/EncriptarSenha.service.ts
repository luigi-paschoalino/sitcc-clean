export interface EncriptarSenhaService {
    encriptar(senha: string): Promise<string>
    comparar(senha: string, senhaHash: string): Promise<boolean>
}
