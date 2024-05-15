import { Injectable } from '@nestjs/common'
import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { PerfilProfessorMapper } from './PerfilProfessor.mapper'
import { UsuarioInfraDTO as UsuarioModel } from '../../../shared/infra/database/prisma/dtos/Usuario.dto'

@Injectable()
export class UsuarioMapper {
    constructor(
        private readonly perfilProfessorMapper: PerfilProfessorMapper,
    ) {}

    domainToModel(domain: Usuario, cursoId: string): UsuarioModel {
        const perfilProfessor = domain.getPerfilProfessor()
            ? this.perfilProfessorMapper?.domainToModel(
                  domain.getPerfilProfessor(),
                  domain.getId(),
              )
            : null

        return {
            id: domain.getId(),
            email: domain.getEmail(),
            cursoId,
            nome: domain.getNome(),
            senha: domain.getSenha(),
            tipo: domain.getTipo(),
            numero: domain.getNumero(),
            hashRecuperacaoSenha: domain.getHashRecuperacaoSenha(),
            matricula: domain.getMatricula(),
            perfilProfessor,
        }
    }

    modelToDomain(model: UsuarioModel): Error | Usuario {
        const perfilProfessor = model.perfilProfessor
            ? this.perfilProfessorMapper.modelToDomain(model.perfilProfessor)
            : null
        if (perfilProfessor instanceof Error) return perfilProfessor

        const usuario = Usuario.carregar(
            {
                nome: model.nome,
                cursoId: model.cursoId,
                email: model.email,
                senha: model.senha,
                tipo: model.tipo as TIPO_USUARIO,
                numero: model.numero,
                hashRecuperacaoSenha: model.hashRecuperacaoSenha,
                perfilProfessor,
                matricula: model.matricula,
            },
            model.id,
        )

        return usuario
    }
}
