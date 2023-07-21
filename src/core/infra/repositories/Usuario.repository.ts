import { Injectable, Logger } from '@nestjs/common'
import { Usuario } from '../../domain/Usuario'
import { RepositoryException } from '../../domain/exceptions/Repository.exception'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { UsuarioRepository } from './../../domain/repositories/Usuario.repository'
import { UsuarioModel } from '../models/Usuario.model'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
    private logger = new Logger(UsuarioRepositoryImpl.name)
    constructor(private readonly usuarioMapper: UsuarioMapper) {}

    async buscarPorId(id: string): Promise<Error | Usuario> {
        try {
            const model = await UsuarioModel.findOneBy({ id })

            if (model instanceof Error)
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
                    `Usuário com o ID ${id} não existe!`,
                )

            const usuario = this.usuarioMapper.modelToDomain(model)

            return usuario
        } catch (error) {
            return error
        }
    }

    async buscarPorEmail(email: string): Promise<Error | Usuario> {
        try {
            const model = await UsuarioModel.findOneBy({ email })

            if (model instanceof Error)
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
                    `Usuário com o email ${email} não existe!`,
                )
            const usuario = this.usuarioMapper.modelToDomain(model)

            return usuario
        } catch (error) {
            return error
        }
    }

    async buscarPorHashSenha(hash: string): Promise<Error | Usuario> {
        try {
            const model = await UsuarioModel.findOneBy({
                hashRecuperacaoSenha: hash,
            })

            if (model instanceof Error)
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
                    `A hash ${hash} expirou ou foi preenchida incorretamente. Solicite novamente a recuperação de senha!`,
                )

            const usuario = this.usuarioMapper.modelToDomain(model)

            return usuario
        } catch (error) {
            return error
        }
    }

    async salvar(usuario: Usuario): Promise<Error | void> {
        try {
            const usuarioModel = this.usuarioMapper.domainToModel(usuario)

            const usuarioSalvo = await usuarioModel.save()

            if (usuarioSalvo instanceof Error)
                throw new RepositoryException(usuarioSalvo.stack)

            return
        } catch (error) {
            return error
        }
    }
}
