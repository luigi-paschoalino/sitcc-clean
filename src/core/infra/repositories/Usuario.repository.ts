import { Inject, Injectable } from '@nestjs/common'
import { RepositoryException } from '../../../shared/domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'
import { TIPO_USUARIO, Usuario } from '../../domain/Usuario'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { UsuarioRepository } from './../../domain/repositories/Usuario.repository'

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
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
                return new RepositoryException(model.stack)
            else if (!model)
                return new RepositoryDataNotFoundException(
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
                return new RepositoryDataNotFoundException(
                    `Não foi possível encontrar nenhum usuário com os IDs informados!`,
                )
            if (models.length !== ids.length)
                return new RepositoryDataNotFoundException(
                    `Não foi possível encontrar os usuários com os seguintes IDs: ${ids.filter(
                        (id) => !models.map((model) => model.id).includes(id),
                    )}`,
                )

            const usuarios = models.map((model) => {
                const domain = this.usuarioMapper.modelToDomain({
                    ...model,
                })
                if (domain instanceof Error) throw domain
                return domain
            })

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
                return new RepositoryException(model.stack)
            else if (!model)
                return new RepositoryDataNotFoundException(
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
            const model = await this.prismaService.usuario.findFirst({
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
                return new RepositoryException(model.stack)
            else if (!model)
                return new RepositoryDataNotFoundException(
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

            const projetosAtuais =
                usuario.getTipo() === TIPO_USUARIO.PROFESSOR
                    ? await this.prismaService.projeto.findMany({
                          where: {
                              perfilProfessorId:
                                  usuarioModel.perfilProfessor?.id,
                          },
                      })
                    : undefined
            const projetosRemovidos = projetosAtuais?.length
                ? projetosAtuais.filter(
                      (projetoAtual) =>
                          !usuarioModel.perfilProfessor.projetos
                              .map((projeto) => projeto.id)
                              .includes(projetoAtual.id),
                  )
                : []

            const usuarioSalvo = await this.prismaService.usuario.upsert({
                where: { id: usuarioModel.id },
                update: {
                    ...usuarioModel,
                    perfilProfessor: usuarioModel.perfilProfessor
                        ? {
                              upsert: {
                                  where: {
                                      id: usuarioModel.perfilProfessor.id,
                                  },
                                  update: {
                                      descricao:
                                          usuarioModel.perfilProfessor
                                              .descricao,
                                      link: usuarioModel.perfilProfessor.link,
                                      areasAtuacao:
                                          usuarioModel.perfilProfessor
                                              .areasAtuacao,
                                      projetos: {
                                          deleteMany: projetosRemovidos.length
                                              ? {
                                                    id: {
                                                        in: projetosRemovidos.map(
                                                            (projeto) =>
                                                                projeto.id,
                                                        ),
                                                    },
                                                }
                                              : undefined,
                                          upsert: usuarioModel.perfilProfessor
                                              .projetos
                                              ? usuarioModel.perfilProfessor.projetos.map(
                                                    (projeto) => ({
                                                        where: {
                                                            id: projeto.id,
                                                        },
                                                        update: {
                                                            descricao:
                                                                projeto.descricao,
                                                            disponivel:
                                                                projeto.disponivel,
                                                            preRequisitos:
                                                                projeto.preRequisitos,
                                                            titulo: projeto.titulo,
                                                        },
                                                        create: {
                                                            descricao:
                                                                projeto.descricao,
                                                            disponivel:
                                                                projeto.disponivel,
                                                            preRequisitos:
                                                                projeto.preRequisitos,
                                                            titulo: projeto.titulo,
                                                        },
                                                    }),
                                                )
                                              : undefined,
                                      },
                                  },
                                  create: {
                                      descricao:
                                          usuarioModel.perfilProfessor
                                              .descricao,
                                      link: usuarioModel.perfilProfessor.link,
                                      areasAtuacao:
                                          usuarioModel.perfilProfessor
                                              .areasAtuacao,
                                      projetos: usuarioModel.perfilProfessor
                                          .projetos
                                          ? {
                                                create: usuarioModel.perfilProfessor.projetos.map(
                                                    (projeto) => ({
                                                        descricao:
                                                            projeto.descricao,
                                                        disponivel:
                                                            projeto.disponivel,
                                                        preRequisitos:
                                                            projeto.preRequisitos,
                                                        titulo: projeto.titulo,
                                                    }),
                                                ),
                                            }
                                          : undefined,
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
                                  descricao:
                                      usuarioModel.perfilProfessor.descricao,
                                  link: usuarioModel.perfilProfessor.link,
                                  areasAtuacao:
                                      usuarioModel.perfilProfessor.areasAtuacao,
                                  projetos: usuarioModel.perfilProfessor
                                      .projetos
                                      ? {
                                            create: usuarioModel.perfilProfessor.projetos.map(
                                                (projeto) => ({
                                                    descricao:
                                                        projeto.descricao,
                                                    disponivel:
                                                        projeto.disponivel,
                                                    preRequisitos:
                                                        projeto.preRequisitos,
                                                    titulo: projeto.titulo,
                                                }),
                                            ),
                                        }
                                      : undefined,
                              },
                          }
                        : undefined,
                },
                include: usuarioModel.perfilProfessor
                    ? {
                          perfilProfessor: {
                              select: {
                                  id: true,
                                  descricao: true,
                                  link: true,
                                  projetos: true,
                                  usuarioId: true,
                              },
                          },
                      }
                    : undefined,
            })

            if (usuarioSalvo instanceof Error)
                return new RepositoryException(usuarioSalvo.stack)

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
                return new RepositoryDataNotFoundException(
                    `Não foi possível encontrar nenhum usuario com o tipo: ${tipo}`,
                )

            const usuarios = models.map((model) => {
                const domain = this.usuarioMapper.modelToDomain({
                    ...model,
                })
                if (domain instanceof Error) throw domain
                return domain
            })
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
                return new RepositoryDataNotFoundException(
                    `Não foi possível encontrar nenhum usuario!`,
                )

            const usuarios = models.map((model) => {
                const domain = this.usuarioMapper.modelToDomain({
                    ...model,
                })
                if (domain instanceof Error) throw domain
                return domain
            })

            return usuarios
        } catch (error) {
            return error
        }
    }
}
