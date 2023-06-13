import { AggregateRoot } from '@nestjs/cqrs'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { Curso } from './Curso'
import { CursoAdicionadoEvent } from './events/CursoAdicionado.event'

export interface CriarInstitutoProps {
    nome: string
    cursos?: Curso[]
}

export class Instituto extends AggregateRoot {
    private id: string
    private nome: string
    private cursos?: Curso[]

    private constructor(id: string) {
        super()

        this.id = id
    }

    static criar(props: CriarInstitutoProps, id: string): Instituto {
        const instituto = new Instituto(id)

        instituto.setNome(props.nome)

        return instituto
    }

    static carregar(props: CriarInstitutoProps, id: string): Instituto {
        const instituto = new Instituto(id)

        instituto.setNome(props.nome)
        instituto.setCursos(props.cursos)

        return instituto
    }

    private setNome(nome: string) {
        if (!nome) throw new InvalidPropsException('Nome inválido!')
        this.nome = nome
    }

    private setCursos(cursos: Curso[]) {
        this.cursos = cursos
    }

    getNome(): string {
        return this.nome
    }

    getId(): string {
        return this.id
    }

    getCursos(): Curso[] {
        return this.cursos
    }

    //TODO: validar na camada de domínio
    addCurso(curso: Curso): void {
        this.cursos.push(curso)

        this.apply(
            new CursoAdicionadoEvent({
                institutoId: this.id,
                cursoId: curso.getId(),
            }),
        )
    }
}
