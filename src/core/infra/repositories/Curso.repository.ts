import { Inject, Injectable } from '@nestjs/common'
import { CursoRepository } from 'src/core/domain/repositories/Curso.repository'
import { RepositoryException } from '../../../shared/domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'
import { Curso } from '../../domain/Curso'
import { CursoMapper } from '../mappers/Curso.mapper'

@Injectable()
export class CursoRepositoryImpl implements CursoRepository {
    constructor(
        @Inject('PrismaService') private readonly prismaService: PrismaService,
        private readonly cursoMapper: CursoMapper,
    ) {}

    async buscarPorId(id: string): Promise<Error | Curso> {
        try {
            const model = await this.prismaService.curso.findUnique({
                where: { id },
                include: {
                    cronogramas: {
                        select: {
                            id: true,
                            ano: true,
                            semestre: true,
                            atividades: true,
                            cursoId: true,
                        },
                    },
                    normas: true,
                },
            })
            if (!model)
                return new RepositoryDataNotFoundException(
                    `Não foi possível encontrar um curso com o ID ${id}`,
                )
            const curso = this.cursoMapper.modelToDomain(model)

            return curso
        } catch (error) {
            return error
        }
    }

    async buscarPorNome(nome: string): Promise<Error | Curso> {
        try {
            const model = await this.prismaService.curso.findUnique({
                where: { nome },
                include: {
                    cronogramas: {
                        select: {
                            id: true,
                            ano: true,
                            semestre: true,
                            atividades: true,
                            cursoId: true,
                        },
                    },
                    normas: true,
                },
            })

            if (!model)
                return new RepositoryDataNotFoundException(
                    `Não foi possível encontrar um curso com o nome '${nome}'`,
                )

            const curso = this.cursoMapper.modelToDomain(model)

            return curso
        } catch (error) {
            return error
        }
    }

    async buscarPorCodigo(codigo: string): Promise<Error | Curso> {
        try {
            const model = await this.prismaService.curso.findUnique({
                where: { codigo },
                include: {
                    cronogramas: {
                        select: {
                            id: true,
                            ano: true,
                            semestre: true,
                            atividades: true,
                            cursoId: true,
                        },
                    },
                    normas: true,
                },
            })

            if (!model)
                return new RepositoryDataNotFoundException(
                    `Não foi possível encontrar um curso com o código '${codigo}'`,
                )

            const curso = this.cursoMapper.modelToDomain(model)

            return curso
        } catch (error) {
            return error
        }
    }

    async listarCursos(ids?: string[]): Promise<Error | Curso[]> {
        try {
            const filter = {}

            if (ids) filter['id'] = { in: ids }

            const models = await this.prismaService.curso.findMany({
                where: filter,
                include: {
                    cronogramas: {
                        select: {
                            id: true,
                            ano: true,
                            semestre: true,
                            atividades: true,
                            cursoId: true,
                        },
                    },
                    normas: true,
                },
            })

            if (!models || models.length === 0)
                return new RepositoryDataNotFoundException(
                    'Não foi possível encontrar nenhum curso',
                )

            const cursos = this.cursoMapper.modelToDomainList(models)
            if (cursos instanceof Error) return cursos

            return cursos
        } catch (error) {
            return error
        }
    }

    async salvarCurso(curso: Curso): Promise<Error | void> {
        try {
            const model = this.cursoMapper.domainToModel(curso)
            if (model instanceof Error) throw model

            const salvarCurso = await this.prismaService.curso.upsert({
                where: { id: model.id },
                create: {
                    ...model,
                    normas: model.normas
                        ? {
                              create: model.normas
                                  .filter((n) => !n.id)
                                  .map((norma) => ({
                                      titulo: norma.titulo,
                                      descricao: norma.descricao,
                                      link: norma.link,
                                  })),
                          }
                        : undefined,
                    cronogramas: model.cronogramas
                        ? {
                              create: model.cronogramas
                                  .filter((c) => !c.id)
                                  .map((cronogramas) => ({
                                      ano: cronogramas.ano,
                                      semestre: cronogramas.semestre,
                                      atividades: {
                                          create: cronogramas.atividades.map(
                                              (atividade) => ({
                                                  titulo: atividade.titulo,
                                                  descricao:
                                                      atividade.descricao,
                                                  data: atividade.data,
                                              }),
                                          ),
                                      },
                                  })),
                          }
                        : undefined,
                },
                update: {
                    ...model,
                    normas: model.normas
                        ? {
                              upsert: model.normas.map((norma) => ({
                                  where: { id: norma.id },
                                  create: {
                                      titulo: norma.titulo,
                                      descricao: norma.descricao,
                                      link: norma.link,
                                  },
                                  update: {
                                      titulo: norma.titulo,
                                      descricao: norma.descricao,
                                      link: norma.link,
                                  },
                              })),
                          }
                        : undefined,
                    cronogramas: model.cronogramas
                        ? {
                              upsert: model.cronogramas.map((cronograma) => ({
                                  where: { id: cronograma.id },
                                  create: {
                                      ano: cronograma.ano,
                                      semestre: cronograma.semestre,
                                      atividades: cronograma.atividades
                                          ? {
                                                create: cronograma.atividades?.map(
                                                    (atividade) => ({
                                                        titulo: atividade.titulo,
                                                        descricao:
                                                            atividade.descricao,
                                                        data: atividade.data,
                                                    }),
                                                ),
                                            }
                                          : undefined,
                                  },
                                  update: {
                                      ano: cronograma.ano,
                                      semestre: cronograma.semestre,
                                      atividades: cronograma.atividades
                                          ? {
                                                upsert: cronograma.atividades.map(
                                                    (atividade) => ({
                                                        where: {
                                                            id: atividade.id,
                                                        },
                                                        create: {
                                                            titulo: atividade.titulo,
                                                            descricao:
                                                                atividade.descricao,
                                                            data: atividade.data,
                                                        },
                                                        update: {
                                                            titulo: atividade.titulo,
                                                            descricao:
                                                                atividade.descricao,
                                                            data: atividade.data,
                                                        },
                                                    }),
                                                ),
                                            }
                                          : undefined,
                                  },
                              })),
                          }
                        : undefined,
                },
                include: {
                    cronogramas: true,
                    normas: true,
                },
            })

            if (salvarCurso instanceof Error)
                return new RepositoryException(salvarCurso.stack)

            return
        } catch (error) {
            return error
        }
    }
}
