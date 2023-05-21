import { Usuario } from '../Usuario'

export interface UsuarioRepository {
    salvarUsuario(usuario: Usuario): Promise<void>
    buscarUsuarioPorId(id: string): Promise<Usuario>
}
