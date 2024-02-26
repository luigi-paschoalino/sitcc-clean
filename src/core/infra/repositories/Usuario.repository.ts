import { Inject, Injectable, Logger } from '@nestjs/common'
import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { RepositoryException } from '../../../shared/domain/exceptions/Repository.exception'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { UsuarioRepository } from './../../domain/repositories/Usuario.repository'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'
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
                    perfilProfessor: {
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
            })

            return usuario
        } catch (error) {
            return error
        }
    }

    async buscarPorIds(ids: string[]): Promise<Error | Usuario[]> {
        try {
            const models = await this.prismaService.usuario.findMany({
                where: { id: { in: ids } },
                include: {
                    perfilProfessor: {
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
                    `Não foi possível encontrar nenhum usuário com os IDs informados!`,
                )
            if (models.length !== ids.length)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar os usuários com os seguintes IDs: ${ids.filter(
                        (id) => !models.map((model) => model.id).includes(id),
                    )}`,
                )

            const usuarios = models.map((model) =>
                this.usuarioMapper.modelToDomain({
                    ...model,
                }),
            )
            return usuarios
        } catch (error) {
            return error
        }
    }

    async buscarPorEmail(email: string): Promise<Error | Usuario> {
        try {
            const model = await this.prismaService.usuario.findUnique({
                where: { email },
                include: {
                    perfilProfessor: {
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
                    perfilProfessor: {
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
                update: {
                    ...usuarioModel,
                    perfilProfessor: usuarioModel.perfilProfessor
                        ? {
                              update: {
                                  id: usuarioModel.perfilProfessor?.id,
                                  areasAtuacao:
                                      usuarioModel.perfilProfessor
                                          ?.areasAtuacao,
                                  descricao:
                                      usuarioModel.perfilProfessor?.descricao,
                                  link: usuarioModel.perfilProfessor?.link,
                                  projetos: {
                                      updateMany:
                                          usuarioModel.perfilProfessor?.projetos?.map(
                                              (projeto) => ({
                                                  where: { id: projeto.id },
                                                  data: {
                                                      ...projeto,
                                                  },
                                              }),
                                          ),
                                  },
                              },
                          }
                        : undefined,
                },
                create: {
                    ...usuarioModel,
                    perfilProfessor: usuarioModel.perfilProfessor
                        ? {
                              create: {
                                  id: usuarioModel.perfilProfessor?.id,
                                  descricao:
                                      usuarioModel.perfilProfessor?.descricao,
                                  link: usuarioModel.perfilProfessor?.link,
                                  areasAtuacao:
                                      usuarioModel.perfilProfessor
                                          ?.areasAtuacao,
                                  projetos: {
                                      createMany: {
                                          data: usuarioModel.perfilProfessor
                                              ?.projetos,
                                      },
                                  },
                              },
                          }
                        : undefined,
                },
                include: usuario.getPerfilProfessor()
                    ? {
                          perfilProfessor: {
                              select: {
                                  id: true,
                                  descricao: true,
                                  link: true,
                                  areasAtuacao: true,
                                  projetos: true,
                                  usuarioId: true,
                              },
                          },
                      }
                    : undefined,
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
                    perfilProfessor: {
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
                }),
            )
            return usuarios
        } catch (error) {
            return error
        }
    }

    async listar(): Promise<Error | Usuario[]> {
        try {
            // TODO: criar rota, permitir apenas admin para ela e validar se funciona
            const models = await this.prismaService.usuario.findMany({})

            if (!models || models.length === 0)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar nenhum usuario!`,
                )

            const usuarios = models.map((model) =>
                this.usuarioMapper.modelToDomain({
                    ...model,
                }),
            )
            return usuarios
        } catch (error) {
            return error
        }
    }
}
