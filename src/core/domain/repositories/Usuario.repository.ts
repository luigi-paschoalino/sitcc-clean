import { TIPO_USUARIO, Usuario } from '../Usuario'

export interface UsuarioRepository {
    salvar(usuario: Usuario): Promise<Error | void>
    buscarPorId(id: string): Promise<Error | Usuario>
    buscarPorIds(ids: string[]): Promise<Error | Usuario[]>
    buscarPorEmail(email: string): Promise<Error | Usuario>
    buscarPorHashSenha(hash: string): Promise<Error | Usuario>
    buscarPorTipo(tipo: TIPO_USUARIO): Promise<Error | Usuario[]>
    listar(): Promise<Error | Usuario[]>
}
