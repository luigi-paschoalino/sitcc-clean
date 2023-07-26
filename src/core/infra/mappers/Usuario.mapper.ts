import { Injectable } from '@nestjs/common'
import { Usuario } from '../../domain/Usuario'
import { UsuarioModel } from '../models/Usuario.model'
import { CursoMapper } from './Curso.mapper'
import { PerfilProfessorMapper } from './PerfilProfessor.mapper'

@Injectable()
export class UsuarioMapper {
    constructor(
        private readonly cursoMapper: CursoMapper,
        private readonly perfilProfessorMapper: PerfilProfessorMapper,
    ) {}

    domainToModel(domain: Usuario): UsuarioModel {
        const usuarioModel = UsuarioModel.create({
            id: domain.getId(),
            nome: domain.getNome(),
            curso: this.cursoMapper.domainToModel(domain.getCurso()),
            email: domain.getEmail(),
            senha: domain.getSenha(),
            tipo: domain.getTipo(),
            numero: domain.getNumero(),
            hashRecuperacaoSenha: domain.getHashRecuperacaoSenha(),
            perfilProfessor: domain.getPerfilProfessor()
                ? this.perfilProfessorMapper.domainToModel(
                      domain.getPerfilProfessor(),
                  )
                : null,
        })

        return usuarioModel
    }

    modelToDomain(model: UsuarioModel): Usuario {
        const curso = this.cursoMapper.modelToDomain(model.curso)

        const usuario = Usuario.carregar(
            {
                nome: model.nome,
                curso,
                email: model.email,
                senha: model.senha,
                tipo: model.tipo,
                numero: model.numero,
                hashRecuperacaoSenha: model.hashRecuperacaoSenha,
                perfilProfessor: model.perfilProfessor
                    ? this.perfilProfessorMapper.modelToDomain(
                          model.perfilProfessor,
                      )
                    : null,
            },
            model.id,
        )

        return usuario
    }
}
