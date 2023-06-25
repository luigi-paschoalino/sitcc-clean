import { AggregateRoot } from '@nestjs/cqrs'
import { UniversidadeException } from './exceptions/Universidade.exception'
import { UniversidadeCriadaEvent } from './events/UniversidadeCriada.event'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { Instituto } from './Instituto'
import { InstitutoAdicionadoEvent } from './events/InstitutoAdicionado.event'
import { Curso } from './Curso'
import { Norma } from './Norma'
import { CursoAdicionadoEvent } from './events/CursoAdicionado.event'
import { Atividade } from './Atividades'

export interface CriarUniversidadeProps {
    nome: string
}

export interface CarregarUniversidadeProps {
    nome: string
    institutos?: Instituto[]
}

export class Universidade extends AggregateRoot {
    private id: string
    private nome: string
    private institutos?: Instituto[]

    private constructor(id: string) {
        super()

        this.id = id
    }

    //TODO: criar universidade use case
    static criar(
        props: CriarUniversidadeProps,
        id: string,
    ): Universidade | Error {
        try {
            if (Object.keys(props).length === 0) {
                throw new UniversidadeException(
                    'Não foram enviadas as propriedades para criar uma universidade',
                )
            }

            const instance = new Universidade(id)

            instance.setNome(props.nome)
            instance.institutos = []

            instance.apply(
                new UniversidadeCriadaEvent({
                    id: instance.id,
                    nome: instance.nome,
                }),
            )

            return instance
        } catch (err) {
            return err
        }
    }

    static carregar(props: CarregarUniversidadeProps, id: string) {
        const instance = new Universidade(id)

        instance.setNome(props.nome)
        instance.setInstitutos(props.institutos)

        return instance
    }

    getNome() {
        return this.nome
    }

    getId() {
        return this.id
    }

    getInstitutos() {
        return this.institutos
    }

    private setInstitutos(institutos: Instituto[]) {
        if (!institutos) institutos = []
        this.institutos = institutos
    }

    private setNome(nome: string) {
        if (!nome) {
            throw new InvalidPropsException('Nome não pode ser vazio')
        }

        this.nome = nome
    }

    //TODO: validações da entidade Instituo devem constar na camada de domínio
    public addInstituto(instituto: Instituto): Error | void {
        try {
            if (!this.institutos) this.institutos = []

            if (
                this.institutos.find((i) => i.getNome() === instituto.getNome())
            )
                throw new UniversidadeException(
                    'Instituto já existe na universidade',
                )

            this.institutos.push(instituto)

            this.apply(
                new InstitutoAdicionadoEvent({
                    universidadeId: this.id,
                    institutoId: instituto.getId(),
                }),
            )
        } catch (error) {
            return error
        }
    }

    public addCurso(institutoId: string, curso: Curso): Error | void {
        try {
            const instituto = this.institutos.find(
                (i) => i.getId() === institutoId,
            )

            if (!instituto) {
                throw new UniversidadeException(
                    'Instituto não existe na universidade',
                )
            }

            instituto.getCursos().push(curso)

            this.apply(
                new CursoAdicionadoEvent({
                    cursoId: curso.getId(),
                    institutoId: instituto.getId(),
                    universidadeId: this.getId(),
                }),
            )
        } catch (error) {
            return error
        }
    }

    addNorma(cursoId: string, norma: Norma): void {
        const instituto = this.institutos.find((i) =>
            i.getCursos().find((c) => c.getId() === cursoId),
        )

        if (!instituto)
            throw new UniversidadeException(
                'Não foi encontrado o curso na universidade',
            )

        const curso = instituto.getCursos().find((c) => c.getId() === cursoId)

        if (!curso)
            throw new UniversidadeException(
                'Não foi encontrado o curso no instituto',
            )

        curso.getNormas().push(norma)
    }

    addAtividade(cronogramaId: string, atividade: Atividade): void {
        const instituto = this.institutos.find((i) =>
            i
                .getCursos()
                .find((c) =>
                    c.getCronogramas().find((f) => f.getId() === cronogramaId),
                ),
        )

        if (!instituto)
            throw new UniversidadeException(
                'Não foi encontrado o curso na universidade',
            )

        const curso = instituto
            .getCursos()
            .find((c) =>
                c.getCronogramas().find((f) => f.getId() === cronogramaId),
            )

        if (!curso)
            throw new UniversidadeException(
                'Não foi encontrado o curso no instituto',
            )

        const cronograma = curso
            .getCronogramas()
            .find((c) => c.getId() === cronogramaId)

        if (!cronograma)
            throw new UniversidadeException(
                'Não foi encontrado o cronograma no curso',
            )

        cronograma.getAtividades().push(atividade)
    }
}
