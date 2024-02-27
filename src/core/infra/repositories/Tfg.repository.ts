import { Inject, Injectable } from '@nestjs/common'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'
import { Tfg } from '../../domain/Tfg'
import { RepositoryException } from '../../../shared/domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'
import { TfgMapper } from '../mappers/Tfg.mapper'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'

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

    async salvarTfg(tfg: Tfg): Promise<Error | void> {
        try {
            const model = this.tfgMapper.domainToModel(tfg)

            await this.prismaService.tfg.upsert({
                where: {
                    id: model.id,
                },
                update: {
                    ...model,
                    banca: {
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
                                    model.banca.notaTrabalhoSegundoProfessor,
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
                                    model.banca.notaTrabalhoSegundoProfessor,
                            },
                        },
                    },
                },
                create: {
                    ...model,
                    banca: {
                        create: {
                            id: model.banca.id,
                            professorId: model.banca.professorId,
                            segundoProfessorId: model.banca.segundoProfessorId,
                            data: model.banca.data,
                            notaApresentacaoProfessor:
                                model.banca.notaApresentacaoProfessor,
                            notaApresentacaoSegundoProfessor:
                                model.banca.notaApresentacaoSegundoProfessor,
                            notaTrabalhoProfessor:
                                model.banca.notaTrabalhoProfessor,
                            notaTrabalhoSegundoProfessor:
                                model.banca.notaTrabalhoSegundoProfessor,
                        },
                    },
                },
            })

            return
        } catch (error) {
            return error
        }
    }
}
