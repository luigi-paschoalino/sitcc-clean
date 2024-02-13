import { Inject, Injectable } from '@nestjs/common'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { Tfg } from '../../domain/Tfg'
import { RepositoryException } from '../../domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'
import { TccMapper } from '../mappers/Tcc.mapper'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'

@Injectable()
export class TccRepositoryImpl implements TccRepository {
    constructor(
        @Inject('PrismaService')
        private readonly prismaService: PrismaService,
        private readonly tccMapper: TccMapper,
    ) {}

    async buscarTcc(id: string): Promise<Error | Tfg> {
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
                    `TCC com ID ${id} não existe!`,
                )
            const tcc = this.tccMapper.modelToDomain(model)
            return tcc
        } catch (error) {
            return error
        }
    }

    async salvarTcc(tcc: Tfg): Promise<Error | void> {
        try {
            const model = this.tccMapper.domainToModel(tcc)

            await this.prismaService.tfg.upsert({
                where: {
                    id: model.id,
                },
                update: {
                    ...model,
                    banca: {
                        upsert: model.banca.map((banca) => ({
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
                            .filter((n) => !n.id)
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
