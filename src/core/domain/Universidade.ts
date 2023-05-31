import { AggregateRoot } from '@nestjs/cqrs'
import { UniversidadeException } from './exceptions/Universidade.exception'
import { UniversidadeCriadaEvent } from './events/UniversidadeCriada.event'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { Instituto } from './Instituto'
import { InstitutoAdicionadoEvent } from './events/InstitutoAdicionado.event'

export interface CriarUniversidadeProps {
    nome: string
}

export class Universidade extends AggregateRoot {
    private id: string
    private nome: string
    private institutos: Instituto[]

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

    getNome() {
        return this.nome
    }

    getId() {
        return this.id
    }

    getInstitutos() {
        return this.institutos
    }

    private setNome(nome: string) {
        if (!nome) {
            throw new InvalidPropsException('Nome não pode ser vazio')
        }

        this.nome = nome
    }

    private setInstitutos(institutos: Instituto[]) {
        if (!institutos) {
            throw new InvalidPropsException(
                'Uma universidade deve conter pelo menos um instituto!',
            )
        }
        this.institutos = institutos
    }

    //TODO: validações da entidade Instituo devem constar na camada de domínio
    public addInstituto(instituto: Instituto) {
        this.institutos.push(instituto)

        this.apply(
            new InstitutoAdicionadoEvent({
                universidadeId: this.id,
                institutoId: instituto.getId(),
            }),
        )
    }
}
