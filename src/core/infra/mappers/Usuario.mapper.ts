import { Injectable } from '@nestjs/common'
import { Usuario } from '../../domain/Usuario'
import { UsuarioModel } from '../models/Usuario.model'
import { CursoMapper } from './Curso.mapper'

@Injectable()
export class UsuarioMapper {
    constructor(private readonly cursoMapper: CursoMapper) {}

    domainToModel(usuario: Usuario): UsuarioModel {
        const usuarioModel = UsuarioModel.create({
            id: usuario.getId(),
            nome: usuario.getNome(),
            curso: this.cursoMapper.domainToModel(usuario.getCurso()),
            email: usuario.getEmail(),
            senha: usuario.getSenha(),
            tipo: usuario.getTipo(),
            numero: usuario.getNumero(),
            hashRecuperacaoSenha: usuario.getHashRecuperacaoSenha(),
        })

        return usuarioModel
    }

    modelToDomain(usuarioModel: UsuarioModel): Usuario {
        const curso = this.cursoMapper.modelToDomain(usuarioModel.curso)

        const usuario = Usuario.carregar(
            {
                nome: usuarioModel.nome,
                curso,
                email: usuarioModel.email,
                senha: usuarioModel.senha,
                tipo: usuarioModel.tipo,
                numero: usuarioModel.numero,
                hashRecuperacaoSenha: usuarioModel.hashRecuperacaoSenha,
            },
            usuarioModel.id,
        )

        return usuario
    }
}
