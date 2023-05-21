import { Injectable } from '@nestjs/common'
import { Usuario } from '../../domain/Usuario'
import { UsuarioModel } from '../models/Usuario.model'

@Injectable()
export class UsuarioMapper {
    constructor() {}

    domainToModel(usuario: Usuario): UsuarioModel {
        const usuarioModel = UsuarioModel.create({
            id: usuario.getId(),
            nome: usuario.getNome(),
            curso: usuario.getCurso(),
            email: usuario.getEmail(),
            senha: usuario.getSenha(),
            tipo: usuario.getTipo(),
            numero: usuario.getNumero(),
        })

        return usuarioModel
    }

    modelToDomain(usuarioModel: UsuarioModel): Usuario {
        const usuario = Usuario.criar(
            {
                nome: usuarioModel.nome,
                curso: usuarioModel.curso,
                email: usuarioModel.email,
                senha: usuarioModel.senha,
                tipo: usuarioModel.tipo,
                numero: usuarioModel.numero,
            },
            usuarioModel.id,
        )

        return usuario
    }
}
