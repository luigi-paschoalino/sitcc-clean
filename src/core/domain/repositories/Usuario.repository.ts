import { Usuario } from '../Usuario'

export interface UsuarioRepository {
    salvar(usuario: Usuario): Promise<Error | void>
    buscarPorId(id: string): Promise<Error | Usuario>
}
