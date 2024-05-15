import { Injectable } from '@nestjs/common'
import { Curso } from '../../domain/Curso'
import { Usuario } from '../../domain/Usuario'
import { UsuarioDTO } from '../../domain/dtos/Usuario.dto'
import { PerfilProfessorDTOMapper } from './PerfilProfessorDTO.mapper'

@Injectable()
export class UsuarioDTOMapper {
    constructor(
        private readonly perfilProfessorDTOMapper: PerfilProfessorDTOMapper,
    ) {}

    toDTO(usuario: Usuario, curso: Curso): UsuarioDTO {
        const perfilProfessor = usuario.getPerfilProfessor()
            ? this.perfilProfessorDTOMapper.toDTO(usuario.getPerfilProfessor())
            : undefined

        return {
            id: usuario.getId(),
            nome: usuario.getNome(),
            email: usuario.getEmail(),
            tipo: usuario.getTipo(),
            numero: usuario.getNumero(),
            matricula: usuario.getMatricula(),
            curso: {
                id: curso.getId(),
                nome: curso.getNome(),
                codigo: curso.getCodigo(),
            },
            perfilProfessor,
        }
    }
}
