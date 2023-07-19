import { AggregateRoot } from '@nestjs/cqrs'
import { PerfilProfessor } from './PerfilProfessor'
import { UsuarioCadastradoEvent } from './events/UsuarioCadastrado.event'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'
import { Curso } from './Curso'
import { SenhaReiniciadaEvent } from './events/SenhaReiniciada.event'

export enum TIPO_USUARIO {
    ALUNO = 'ALUNO',
    PROFESSOR = 'PROFESSOR',
    COORDENADOR = 'COORDENADOR',
    ADMINISTRADOR = 'ADMINISTRADOR',
}

export interface CriarUsuarioProps {
    nome: string
    curso: Curso
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
}

export interface CarregarUsuarioProps {
    nome: string
    curso: Curso
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
    hashRecuperacaoSenha?: string
    perfilProfessor?: PerfilProfessor
}

//TODO: usuario vai ser um só, com perfil professor criado pelo handler do evento usuarioCriadoEvent em caso do enum ser 'PROFESSOR'

//TODO: métodos de atualização do perfilProfessor serão feitas apenas se o enum for 'PROFESSOR'
export class Usuario extends AggregateRoot {
    private id: string // Matricula
    private curso: Curso
    private nome: string
    private email: string
    private senha: string //TODO: hashear senha
    private tipo: TIPO_USUARIO
    private numero: string
    private hashRecuperacaoSenha?: string
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
                    curso: instance.curso.getId(),
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

    static carregar(props: CarregarUsuarioProps, id: string): Usuario {
        const instance = new Usuario(id)

        instance.setNome(props.nome)
        instance.setCurso(props.curso)
        instance.setSenha(props.senha)
        instance.setTipo(props.tipo)
        instance.setNumero(props.numero)
        instance.setPerfilProfessor(props.perfilProfessor)

        instance.email = props.email
        instance.hashRecuperacaoSenha = props.hashRecuperacaoSenha

        return instance
    }

    public reiniciarSenha(hash: string): void {
        this.hashRecuperacaoSenha = hash

        this.apply(
            new SenhaReiniciadaEvent({
                usuarioId: this.id,
                timestamp: new Date(),
            }),
        )
    }

    public alterarSenha(senha: string, hash: string): Error | void {
        if (
            this.hashRecuperacaoSenha !== hash ||
            !this.hashRecuperacaoSenha?.trim()
        )
            throw new InvalidPropsException('Hash inválido')
        this.setSenha(senha)
        this.hashRecuperacaoSenha = null
    }

    private setNome(nome: string) {
        if (!nome) throw new InvalidPropsException('Nome não informado')
        this.nome = nome
    }

    private setCurso(curso: Curso) {
        if (!curso) throw new InvalidPropsException('Curso não informado')
        this.curso = curso
    }

    private setEmail(email: string) {
        if (!email) throw new InvalidPropsException('Email não informado')
        const regex = /^[a-zA-Z0-9._%+-]+@unifei.edu.br$/
        if (!regex.test(email))
            throw new InvalidPropsException('Email com formato inválido')
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
        // if (!perfilProfessor || this.tipo !== TIPO_USUARIO.PROFESSOR)
        // throw new InvalidPropsException('Perfil professor não informado')
        this.perfilProfessor = perfilProfessor
    }

    public getId(): string {
        return this.id
    }

    public getNome(): string {
        return this.nome
    }

    public getCurso(): Curso {
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

    public getHashRecuperacaoSenha(): string {
        return this.hashRecuperacaoSenha
    }
}
