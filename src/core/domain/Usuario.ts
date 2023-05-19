export enum TIPO_USUARIO {
    ALUNO = 'ALUNO',
    PROFESSOR = 'PROFESSOR',
    COORDENADOR = 'COORDENADOR',
    ADMINISTRADOR = 'ADMINISTRADOR',
}

//TODO: transformar usuario em abstract class
export abstract class Usuario {
    private id: string // Matricula
    private curso: string
    private nome: string
    private email: string
    private senha: string //TODO: hashear senha
    private tipo: TIPO_USUARIO
    private numero: string

    private constructor() {}
}