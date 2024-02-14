import { Inject, Injectable, Logger } from '@nestjs/common'
import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { RepositoryException } from '../../domain/exceptions/Repository.exception'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { UsuarioRepository } from './../../domain/repositories/Usuario.repository'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
    private logger = new Logger(UsuarioRepositoryImpl.name)
    constructor(
        @Inject('PrismaService') private readonly prismaService: PrismaService,
        private readonly usuarioMapper: UsuarioMapper,
    ) {}

    async buscarPorId(id: string): Promise<Error | Usuario> {
        try {
            const model = await this.prismaService.usuario.findUnique({
                where: { id },
                include: {
                    PerfilProfessor: {
                        select: {
                            id: true,
                            descricao: true,
                            link: true,
                            areasAtuacao: true,
                            projetos: true,
                            usuarioId: true,
                        },
                    },
                },
            })

            if (model instanceof Error)
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
                    `Usuário com o ID ${id} não existe!`,
                )

            const usuario = this.usuarioMapper.modelToDomain({
                ...model,
                perfilProfessor: model.PerfilProfessor,
            })

            return usuario
        } catch (error) {
            return error
        }
    }

    async buscarPorEmail(email: string): Promise<Error | Usuario> {
        try {
            const model = await this.prismaService.usuario.findUnique({
                where: { email },
                include: {
                    PerfilProfessor: {
                        select: {
                            id: true,
                            descricao: true,
                            link: true,
                            areasAtuacao: true,
                            projetos: true,
                            usuarioId: true,
                        },
                    },
                },
            })

            if (model instanceof Error)
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
                    `Usuário com o email ${email} não existe!`,
                )
            const usuario = this.usuarioMapper.modelToDomain({
                ...model,
                perfilProfessor: model.PerfilProfessor,
            })

            return usuario
        } catch (error) {
            return error
        }
    }

    async buscarPorHashSenha(hash: string): Promise<Error | Usuario> {
        try {
            const model = await this.prismaService.usuario.findFirstOrThrow({
                where: {
                    hashRecuperacaoSenha: hash,
                },
                include: {
                    PerfilProfessor: {
                        select: {
                            id: true,
                            descricao: true,
                            link: true,
                            areasAtuacao: true,
                            projetos: true,
                            usuarioId: true,
                        },
                    },
                },
            })

            if (model instanceof Error)
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
                    `A hash ${hash} expirou ou foi preenchida incorretamente. Solicite novamente a recuperação de senha!`,
                )

            const usuario = this.usuarioMapper.modelToDomain({
                ...model,
                perfilProfessor: model.PerfilProfessor,
            })

            return usuario
        } catch (error) {
            return error
        }
    }

    async salvar(usuario: Usuario): Promise<Error | void> {
        try {
            const usuarioModel = this.usuarioMapper.domainToModel(
                usuario,
                usuario.getCurso(),
            )

            const usuarioSalvo = await this.prismaService.usuario.upsert({
                where: { id: usuarioModel.id },
                update: usuarioModel,
                create: usuarioModel,
                include: {
                    PerfilProfessor: {
                        select: {
                            id: true,
                            descricao: true,
                            link: true,
                            areasAtuacao: true,
                            projetos: true,
                            usuarioId: true,
                        },
                    },
                },
            })

            if (usuarioSalvo instanceof Error)
                throw new RepositoryException(usuarioSalvo.stack)

            return
        } catch (error) {
            return error
        }
    }

    async buscarPorTipo(tipo: TIPO_USUARIO): Promise<Error | Usuario[]> {
        try {
            const models = await this.prismaService.usuario.findMany({
                where: { tipo },
                include: {
                    PerfilProfessor: {
                        select: {
                            id: true,
                            descricao: true,
                            link: true,
                            areasAtuacao: true,
                            projetos: true,
                            usuarioId: true,
                        },
                    },
                },
            })
            if (!models || models.length === 0)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar nenhum usuario com o tipo: ${tipo}`,
                )

            const usuarios = models.map((model) =>
                this.usuarioMapper.modelToDomain({
                    ...model,
                    perfilProfessor: model.PerfilProfessor,
                }),
            )
            return usuarios
        } catch (error) {
            return error
        }
    }
}
