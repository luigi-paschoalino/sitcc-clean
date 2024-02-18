import { Inject, Injectable } from '@nestjs/common'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'
import { Tfg } from '../../domain/Tfg'
import { RepositoryException } from '../../domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'
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
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
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
                        upsert: model.banca?.map((banca) => ({
                            where: {
                                id: banca.id,
                            },
                            update: banca,
                            create: banca,
                        })),
                    },
                },
                create: {
                    ...model,
                    banca: {
                        create: model.banca
                            ?.filter((n) => !n.id)
                            .map((banca) => ({
                                professorId: banca.professorId,
                                segundoProfessorId: banca.segundoProfessorId,
                                data: banca.data,
                                notaApresentacao: banca.notaApresentacao,
                                notaTrabalho: banca.notaTrabalho,
                                versao: banca.versao,
                            })),
                    },
                },
            })

            return
        } catch (error) {
            return error
        }
    }
}
