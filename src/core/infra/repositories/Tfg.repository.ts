import { Inject, Injectable } from '@nestjs/common'
import {
    TfgFiltroProps,
    TfgRepository,
} from '../../domain/repositories/Tfg.repository'
import { Tfg } from '../../domain/Tfg'
import { RepositoryException } from '../../../shared/domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'
import { TfgMapper } from '../mappers/Tfg.mapper'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'
import { STATUS_TFG } from '@prisma/client'
import { STATUS_TFG as STATUS_TFG_DOMAIN } from '../../domain/Tfg'
import { TfgDTO } from '../../domain/dtos/Tfg.dto'

@Injectable()
export class TfgRepositoryImpl implements TfgRepository {
    constructor(
        @Inject('PrismaService')
        private readonly prismaService: PrismaService,
        private readonly tfgMapper: TfgMapper,
    ) {}

    async buscarTfg(id: string): Promise<Error | Tfg> {
        try {
            const model = await this.prismaService.tfg.findUnique({
                where: {
                    id,
                },
                include: {
                    banca: true,
                },
            })

            if (model instanceof Error)
                return new RepositoryException(model.stack)
            else if (!model)
                return new RepositoryDataNotFoundException(
                    `TFG com ID ${id} não existe!`,
                )
            const tfg = this.tfgMapper.modelToDomain(model)
            return tfg
        } catch (error) {
            return error
        }
    }

    async buscarTfgBFF(id: string): Promise<Error | TfgDTO> {
        try {
            const model = await this.prismaService.tfg.findUnique({
                where: {
                    id,
                },
                include: {
                    banca: true,
                    aluno: {
                        select: {
                            id: true,
                            nome: true,
                        },
                    },
                    orientador: {
                        select: {
                            id: true,
                            nome: true,
                        },
                    },
                    coorientador: {
                        select: {
                            id: true,
                            nome: true,
                        },
                    },
                },
            })

            if (model instanceof Error) return model
            else if (!model)
                return new RepositoryDataNotFoundException(
                    `TFG com ID ${id} não existe!`,
                )

            const dto: TfgDTO = {
                id: model.id,
                titulo: model.titulo,
                palavrasChave: model.palavrasChave,
                objetivos: model.objetivos,
                bibliografia: model.bibliografia,
                introducao: model.introducao,
                descricaoMetodologia: model.descricaoMetodologia,
                tecnicaPesquisa: model.tecnicaPesquisa,
                metodoPesquisa: model.metodoPesquisa,
                resultadosEsperados: model.resultados,
                notaParcial: Number(model.notaParcial),
                notaFinal: Number(model.notaFinal),
                aluno: model.aluno.nome,
                status: model.status as STATUS_TFG_DOMAIN,
                orientador: model.orientador.nome,
                coorientador: model.coorientador
                    ? model.coorientador.nome
                    : undefined,
            }

            return dto
        } catch (error) {
            return error
        }
    }

    async listarTfgs(
        apenasAtivos: boolean,
        filtro?: TfgFiltroProps,
    ): Promise<Error | Tfg[]> {
        try {
            const models = await this.prismaService.tfg.findMany(
                filtro
                    ? {
                          where: {
                              ...filtro,
                              status: apenasAtivos
                                  ? {
                                        notIn: [
                                            STATUS_TFG.APROVADO,
                                            STATUS_TFG.REPROVADO,
                                            STATUS_TFG.ORIENTACAO_RECUSADA,
                                        ],
                                    }
                                  : undefined,
                          },
                          include: {
                              banca: true,
                          },
                      }
                    : undefined,
            )

            const domainArray: Tfg[] = []

            for (const model of models) {
                const domain = this.tfgMapper.modelToDomain(model)
                if (domain instanceof Error) throw domain

                domainArray.push(domain)
            }

            return domainArray
        } catch (error) {
            return error
        }
    }

    async listarTfgsBFF(
        apenasAtivos: boolean,
        filtro?: TfgFiltroProps,
    ): Promise<Error | TfgDTO[]> {
        try {
            const models = await this.prismaService.tfg.findMany(
                filtro
                    ? {
                          where: {
                              ...filtro,
                              status: apenasAtivos
                                  ? {
                                        notIn: [
                                            STATUS_TFG.APROVADO,
                                            STATUS_TFG.REPROVADO,
                                        ],
                                    }
                                  : undefined,
                          },
                          include: {
                              banca: true,
                              aluno: {
                                  select: {
                                      id: true,
                                      nome: true,
                                  },
                              },
                              orientador: {
                                  select: {
                                      id: true,
                                      nome: true,
                                  },
                              },
                              coorientador: {
                                  select: {
                                      id: true,
                                      nome: true,
                                  },
                              },
                          },
                      }
                    : undefined,
            )

            const dtoArray: TfgDTO[] = []

            for (const model of models) {
                dtoArray.push({
                    id: model.id,
                    titulo: model.titulo,
                    palavrasChave: model.palavrasChave,
                    objetivos: model.objetivos,
                    bibliografia: model.bibliografia,
                    introducao: model.introducao,
                    descricaoMetodologia: model.descricaoMetodologia,
                    tecnicaPesquisa: model.tecnicaPesquisa,
                    metodoPesquisa: model.metodoPesquisa,
                    resultadosEsperados: model.resultados,
                    notaParcial: Number(model.notaParcial),
                    notaFinal: Number(model.notaFinal),
                    aluno: model.aluno.nome,
                    status: model.status as STATUS_TFG_DOMAIN,
                    orientador: model.orientador.nome,
                    coorientador: model.coorientador
                        ? model.coorientador.nome
                        : undefined,
                })
            }

            return dtoArray
        } catch (error) {
            return error
        }
    }

    async salvarTfg(tfg: Tfg): Promise<Error | void> {
        try {
            const model = this.tfgMapper.domainToModel(tfg)

            await this.prismaService.tfg.upsert({
                where: {
                    id: model.id,
                },
                update: {
                    ...model,
                    banca: model.banca
                        ? {
                              upsert: {
                                  where: {
                                      id: model.banca.id,
                                  },
                                  update: {
                                      id: model.banca.id,
                                      professorId: model.banca.professorId,
                                      segundoProfessorId:
                                          model.banca.segundoProfessorId,
                                      data: model.banca.data,
                                      notaApresentacaoProfessor:
                                          model.banca.notaApresentacaoProfessor,
                                      notaApresentacaoSegundoProfessor:
                                          model.banca
                                              .notaApresentacaoSegundoProfessor,
                                      notaTrabalhoProfessor:
                                          model.banca.notaTrabalhoProfessor,
                                      notaTrabalhoSegundoProfessor:
                                          model.banca
                                              .notaTrabalhoSegundoProfessor,
                                  },
                                  create: {
                                      id: model.banca.id,
                                      professorId: model.banca.professorId,
                                      segundoProfessorId:
                                          model.banca.segundoProfessorId,
                                      data: model.banca.data,
                                      notaApresentacaoProfessor:
                                          model.banca.notaApresentacaoProfessor,
                                      notaApresentacaoSegundoProfessor:
                                          model.banca
                                              .notaApresentacaoSegundoProfessor,
                                      notaTrabalhoProfessor:
                                          model.banca.notaTrabalhoProfessor,
                                      notaTrabalhoSegundoProfessor:
                                          model.banca
                                              .notaTrabalhoSegundoProfessor,
                                  },
                              },
                          }
                        : undefined,
                },
                create: {
                    ...model,
                    banca: model.banca
                        ? {
                              create: {
                                  id: model.banca.id,
                                  professorId: model.banca.professorId,
                                  segundoProfessorId:
                                      model.banca.segundoProfessorId,
                                  data: model.banca.data,
                                  notaApresentacaoProfessor:
                                      model.banca.notaApresentacaoProfessor,
                                  notaApresentacaoSegundoProfessor:
                                      model.banca
                                          .notaApresentacaoSegundoProfessor,
                                  notaTrabalhoProfessor:
                                      model.banca.notaTrabalhoProfessor,
                                  notaTrabalhoSegundoProfessor:
                                      model.banca.notaTrabalhoSegundoProfessor,
                              },
                          }
                        : undefined,
                },
            })

            return
        } catch (error) {
            return error
        }
    }
}
