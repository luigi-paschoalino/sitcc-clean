import { Usuario } from '../../domain/Usuario'
import { UsuarioDTO } from '../../domain/dtos/Usuario.dto'

export class UsuarioDTOMapper {
    toDTO(usuario: Usuario): UsuarioDTO {
        return {
            id: usuario.getId(),
            nome: usuario.getNome(),
            email: usuario.getEmail(),
            tipo: usuario.getTipo(),
            numero: usuario.getNumero(),
            matricula: usuario.getMatricula(),
        }
    }
}
