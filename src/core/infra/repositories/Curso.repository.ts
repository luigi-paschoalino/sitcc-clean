import { CursoRepository } from 'src/core/domain/repositories/Curso.repository'
import { CursoMapper } from '../mappers/Curso.mapper'
import { RepositoryException } from '../../../shared/domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { Curso } from '../../domain/Curso'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'

@Injectable()
export class CursoRepositoryImpl implements CursoRepository {
    private logger = new Logger(CursoRepositoryImpl.name)
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

            const cursos = models.map((model) =>
                this.cursoMapper.modelToDomain(model),
            )

            return cursos
        } catch (error) {
            return error
        }
    }

    async salvarCurso(curso: Curso): Promise<Error | void> {
        try {
            const model = this.cursoMapper.domainToModel(curso)

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
                              upsert: model.cronogramas.map((cronogramas) => ({
                                  where: { id: cronogramas.id },
                                  create: {
                                      ano: cronogramas.ano,
                                      semestre: cronogramas.semestre,
                                      atividades: cronogramas.atividades
                                          ? {
                                                create: cronogramas.atividades?.map(
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
                                      ano: cronogramas.ano,
                                      semestre: cronogramas.semestre,
                                      atividades: cronogramas.atividades
                                          ? {
                                                upsert: cronogramas.atividades.map(
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
