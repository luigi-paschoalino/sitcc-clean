import { Universidade } from 'src/core/domain/Universidade'
import { UniversidadeRepository } from 'src/core/domain/repositories/Universidade.repository'
import { UniversidadeMapper } from '../mappers/Universidade.mapper'
import { RepositoryException } from '../../domain/exceptions/Repository.exception'
import { UniversidadeModel } from '../models/Universidade.model'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'
import { Injectable, Logger } from '@nestjs/common'
import { In } from 'typeorm'

@Injectable()
export class UniversidadeRepositoryImpl implements UniversidadeRepository {
    private logger = new Logger(UniversidadeRepositoryImpl.name)
    constructor(private readonly universidadeMapper: UniversidadeMapper) {}

    async buscarPorId(id: string): Promise<Error | Universidade> {
        try {
            const model = await UniversidadeModel.findOne({ where: { id } })

            if (!model)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar a universidade com o ID ${id}`,
                )

            this.logger.debug(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa' + JSON.stringify(model),
            )

            const universidade = this.universidadeMapper.modelToDomain(model)

            return universidade
        } catch (error) {
            return error
        }
    }

    async buscarPorNome(nome: string): Promise<Error | Universidade> {
        try {
            const model = await UniversidadeModel.findOne({ where: { nome } })

            if (!model)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar a universidade com o nome ${nome}`,
                )

            const universidade = this.universidadeMapper.modelToDomain(model)

            return universidade
        } catch (error) {
            return error
        }
    }

    async buscarPorInstituto(
        institutoId: string,
    ): Promise<Universidade | Error> {
        try {
            const model = await UniversidadeModel.findOne({
                where: {
                    institutos: {
                        id: institutoId,
                    },
                },
            })

            if (!model)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar uma universidade com o instituto ${institutoId}`,
                )

            this.logger.debug(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa' + JSON.stringify(model),
            )

            const universidade = this.universidadeMapper.modelToDomain(model)

            if (universidade instanceof Error) throw universidade

            return universidade
        } catch (error) {
            return error
        }
    }

    async buscarPorCurso(cursoId: string): Promise<Error | Universidade> {
        try {
            const model = await UniversidadeModel.findOne({
                where: {
                    institutos: {
                        cursos: {
                            id: cursoId,
                        },
                    },
                },
            })

            if (!model)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar uma universidade com o curso ${cursoId}`,
                )

            const universidade = this.universidadeMapper.modelToDomain(model)

            return universidade
        } catch (error) {
            return error
        }
    }

    async listarUniversidades(ids?: string[]): Promise<Error | Universidade[]> {
        try {
            const filter = {}

            if (ids) filter['id'] = In(ids)

            const models = await UniversidadeModel.find({ where: filter })

            if (!models || models.length === 0)
                throw new RepositoryDataNotFoundException(
                    'Não foi possível encontrar nenhuma universidade',
                )

            const universidades = models.map((model) =>
                this.universidadeMapper.modelToDomain(model),
            )

            return universidades
        } catch (error) {
            return error
        }
    }

    async salvarUniversidade(
        universidade: Universidade,
    ): Promise<Error | void> {
        try {
            const universidadeModel =
                this.universidadeMapper.domainToModel(universidade)

            const salvarUniversidade = await universidadeModel.save()

            if (salvarUniversidade instanceof Error)
                throw new RepositoryException(salvarUniversidade.message)

            return
        } catch (error) {
            return error
        }
    }
}
