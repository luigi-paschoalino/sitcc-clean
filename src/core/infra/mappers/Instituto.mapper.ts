import { Instituto } from '../../domain/Instituto'
import { InstitutoModel } from './../models/Instituto.model'
import { Injectable } from '@nestjs/common'
import { CursoMapper } from './Curso.mapper'

@Injectable()
export class InstitutoMapper {
    constructor(private readonly cursoMapper: CursoMapper) {}

    public domainToModel(domain: Instituto): InstitutoModel {
        const model = InstitutoModel.create({
            id: domain.getId(),
            nome: domain.getNome(),
            cursos: domain
                .getCursos()
                .map((curso) => this.cursoMapper.domainToModel(curso)),
        })

        return model
    }

    public modelToDomain(model: InstitutoModel): Instituto {
        try {
            if (!model.cursos) model.cursos = []

            const cursos = model.cursos.map((curso) =>
                this.cursoMapper.modelToDomain(curso),
            )

            const domain = Instituto.carregar(
                {
                    nome: model.nome,
                    cursos: cursos,
                },
                model.id,
            )

            if (domain instanceof Error) throw domain

            return domain
        } catch (error) {
            return error
        }
    }
}
