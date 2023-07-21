import { Usuario } from '../Usuario'

export interface UsuarioRepository {
    salvar(usuario: Usuario): Promise<Error | void>
    buscarPorId(id: string): Promise<Error | Usuario>
    buscarPorEmail(email: string): Promise<Error | Usuario>
    buscarPorHashSenha(hash: string): Promise<Error | Usuario>
}
