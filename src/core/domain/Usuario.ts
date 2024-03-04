import { AbstractAggregateRoot } from '../../shared/domain/AbstractAggregateRoot'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'
import { CriarPerfilProps, PerfilProfessor } from './PerfilProfessor'
import { SenhaReiniciadaEvent } from './events/SenhaReiniciada.event'
import { UsuarioCadastradoEvent } from './events/UsuarioCadastrado.event'

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
    matricula: string
    codigo?: string
}

export interface CarregarUsuarioProps {
    nome: string
    cursoId: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
    matricula: string
    hashRecuperacaoSenha?: string
    perfilProfessor?: PerfilProfessor
}

export class Usuario extends AbstractAggregateRoot<string> {
    private cursoId: string
    private nome: string
    private email: string
    private senha: string
    private tipo: TIPO_USUARIO
    private numero: string
    private matricula: string
    private hashRecuperacaoSenha?: string
    private perfilProfessor?: PerfilProfessor

    private constructor(id?: string) {
        super(id)
    }

    static criar(props: CriarUsuarioProps): Usuario {
        try {
            if (Object.keys(props).length === 0)
                throw new InvalidPropsException(
                    'Dados do usuário não informados',
                )

            const instance = new Usuario()

            instance.setNome(props.nome)
            instance.setCurso(props.curso)
            instance.setEmail(props.email)
            instance.setSenha(props.senha)
            instance.setTipo(props.tipo)
            instance.setNumero(props.numero)
            instance.matricula = props.matricula

            instance.apply(
                new UsuarioCadastradoEvent({
                    id: instance.id,
                    curso: instance.cursoId,
                    nome: instance.nome,
                    email: instance.email,
                    senha: instance.senha,
                    tipo: instance.tipo,
                    numero: instance.numero,
                    codigo: props.codigo,
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
        instance.setCurso(props.cursoId)
        instance.setSenha(props.senha)
        instance.setTipo(props.tipo)
        instance.setNumero(props.numero)
        instance.setPerfilProfessor(props.perfilProfessor)

        instance.email = props.email
        instance.matricula = props.matricula
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
            return new InvalidPropsException('Hash inválido')
        this.setSenha(senha)
        this.hashRecuperacaoSenha = null
    }

    private setNome(nome: string): Error | void {
        if (!nome) return new InvalidPropsException('Nome não informado')
        this.nome = nome
    }

    private setCurso(curso: string): Error | void {
        if (!curso) return new InvalidPropsException('Curso não informado')
        this.cursoId = curso
    }

    private setEmail(email: string): Error | void {
        if (!email) return new InvalidPropsException('Email não informado')
        const regex = /^[a-zA-Z0-9._%+-]+@unifei.edu.br$/
        if (!regex.test(email))
            return new InvalidPropsException('Email com formato inválido')
        this.email = email
    }

    private setSenha(senha: string): Error | void {
        if (!senha) return new InvalidPropsException('Senha não informada')
        this.senha = senha
    }

    private setTipo(tipo: TIPO_USUARIO): Error | void {
        if (!tipo) return new InvalidPropsException('Tipo não informado')
        if (!Object.values(TIPO_USUARIO).includes(tipo))
            return new InvalidPropsException('Tipo inválido')
        this.tipo = tipo
    }

    private setNumero(numero: string): Error | void {
        if (!numero) return new InvalidPropsException('Número não informado')
        this.numero = numero
    }

    public setPerfilProfessor(perfilProfessor: PerfilProfessor) {
        if (this.getTipo() === TIPO_USUARIO.PROFESSOR)
            this.perfilProfessor = perfilProfessor
    }

    atualizarPerfilProfessor(
        props: Omit<CriarPerfilProps, 'projetos'>,
    ): Error | void {
        if (this.getTipo() !== TIPO_USUARIO.PROFESSOR)
            return new InvalidPropsException(
                'Apenas professores podem ter perfil',
            )
        if (!this.perfilProfessor)
            return new InvalidPropsException('Perfil não encontrado')

        this.perfilProfessor.atualizar(props)
    }

    public getNome(): string {
        return this.nome
    }

    public getCurso(): string {
        return this.cursoId
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

    public getMatricula(): string {
        return this.matricula
    }

    public getPerfilProfessor(): PerfilProfessor {
        return this.perfilProfessor
    }

    public getHashRecuperacaoSenha(): string {
        return this.hashRecuperacaoSenha
    }
}
