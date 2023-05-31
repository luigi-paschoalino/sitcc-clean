import { AggregateRoot } from '@nestjs/cqrs'
import { PerfilProfessor } from './PerfilProfessor'
import { UsuarioCadastradoEvent } from './events/UsuarioCadastrado.event'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export enum TIPO_USUARIO {
    ALUNO = 'ALUNO',
    PROFESSOR = 'PROFESSOR',
    COORDENADOR = 'COORDENADOR',
    ADMINISTRADOR = 'ADMINISTRADOR',
}

export interface CriarUsuarioProps {
    nome: string
    curso: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
}

//TODO: usuario vai ser um só, com perfil professor criado pelo handler do evento usuarioCriadoEvent em caso do enum ser 'PROFESSOR'

//TODO: métodos de atualização do perfilProfessor serão feitas apenas se o enum for 'PROFESSOR'
export class Usuario extends AggregateRoot {
    private id: string // Matricula
    private curso: string
    private nome: string
    private email: string
    private senha: string //TODO: hashear senha
    private tipo: TIPO_USUARIO
    private numero: string
    private perfilProfessor?: PerfilProfessor

    private constructor(id: string) {
        super()

        this.id = id
    }

    static criar(props: CriarUsuarioProps, id: string): Usuario {
        try {
            //TODO arrumar exceção
            if (Object.keys(props).length === 0)
                throw new InvalidPropsException(
                    'Dados do usuário não informados',
                )

            const instance = new Usuario(id)

            instance.setNome(props.nome)
            instance.setCurso(props.curso)
            instance.setEmail(props.email)
            instance.setSenha(props.senha)
            instance.setTipo(props.tipo)
            instance.setNumero(props.numero)

            instance.apply(
                new UsuarioCadastradoEvent({
                    id: instance.id,
                    curso: instance.curso,
                    nome: instance.nome,
                    email: instance.email,
                    senha: instance.senha,
                    tipo: instance.tipo,
                    numero: instance.numero,
                }),
            )

            return instance
        } catch (error) {
            return error
        }
    }

    private setNome(nome: string) {
        if (!nome) throw new InvalidPropsException('Nome não informado')
        this.nome = nome
    }

    private setCurso(curso: string) {
        if (!curso) throw new InvalidPropsException('Curso não informado')
        this.curso = curso
    }

    private setEmail(email: string) {
        if (!email) throw new InvalidPropsException('Email não informado')
        this.email = email
    }

    private setSenha(senha: string) {
        if (!senha) throw new InvalidPropsException('Senha não informada')
        this.senha = senha
    }

    private setTipo(tipo: TIPO_USUARIO) {
        if (!tipo) throw new InvalidPropsException('Tipo não informado')
        if (!Object.values(TIPO_USUARIO).includes(tipo))
            throw new InvalidPropsException('Tipo inválido')
        this.tipo = tipo
    }

    private setNumero(numero: string) {
        if (!numero) throw new InvalidPropsException('Número não informado')
        this.numero = numero
    }

    private setPerfilProfessor(perfilProfessor: PerfilProfessor) {
        if (!perfilProfessor)
            throw new InvalidPropsException('Perfil professor não informado')
        this.perfilProfessor = perfilProfessor
    }

    public getId(): string {
        return this.id
    }

    public getNome(): string {
        return this.nome
    }

    public getCurso(): string {
        return this.curso
    }

    public getEmail(): string {
        return this.email
    }

    public getSenha(): string {
        return this.senha
    }

    public getTipo(): TIPO_USUARIO {
        return this.tipo
    }

    public getNumero(): string {
        return this.numero
    }

    public getPerfilProfessor(): PerfilProfessor {
        return this.perfilProfessor
    }
}
