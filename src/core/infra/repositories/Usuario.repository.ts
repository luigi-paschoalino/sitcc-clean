import { Usuario } from '../../domain/Usuario'
import { UsuarioRepository } from './../../domain/repositories/Usuario.repository'
export class UsuarioRepositoryImpl implements UsuarioRepository {
    constructor() {}

    buscarUsuarioPorId(id: string): Promise<Usuario> {
        try {
            return
        } catch (error) {
            return error
        }
    }

    salvarUsuario(usuario: Usuario): Promise<void> {
        try {
            console.log(usuario)
            return
        } catch (error) {
            return error
        }
    }
}
