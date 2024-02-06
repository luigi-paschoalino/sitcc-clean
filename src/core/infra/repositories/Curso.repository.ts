import { CursoRepository } from 'src/core/domain/repositories/Curso.repository'
import { CursoMapper } from '../mappers/Curso.mapper'
import { RepositoryException } from '../../domain/exceptions/Repository.exception'
import { CursoModel } from '../models/Curso.model'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'
import { Injectable, Logger } from '@nestjs/common'
import { In } from 'typeorm'
import { Curso } from '../../domain/Curso'

@Injectable()
export class CursoRepositoryImpl implements CursoRepository {
    private logger = new Logger(CursoRepositoryImpl.name)
    constructor(private readonly cursoMapper: CursoMapper) {}

    async buscarPorId(id: string): Promise<Error | Curso> {
        try {
            const model = await CursoModel.findOne({ where: { id } })

            if (!model)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar a curso com o ID ${id}`,
                )

            const curso = this.cursoMapper.modelToDomain(model)

            return curso
        } catch (error) {
            return error
        }
    }

    async buscarPorNome(nome: string): Promise<Error | Curso> {
        try {
            const model = await CursoModel.findOne({ where: { nome } })

            if (!model)
                throw new RepositoryDataNotFoundException(
                    `Não foi possível encontrar um curso com o nome ${nome}`,
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

            if (ids) filter['id'] = In(ids)

            const models = await CursoModel.find({ where: filter })

            if (!models || models.length === 0)
                throw new RepositoryDataNotFoundException(
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
            const cursoModel = this.cursoMapper.domainToModel(curso)

            const salvarCurso = await cursoModel.save()

            if (salvarCurso instanceof Error)
                throw new RepositoryException(salvarCurso.stack)

            return
        } catch (error) {
            return error
        }
    }
}
