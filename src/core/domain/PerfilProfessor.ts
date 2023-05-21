export class PerfilProfessor {
    private id: string
    private nome: string
    private descricao: string
    private link: string

    private constructor() {}

    static criar(): PerfilProfessor {
        const instance = new PerfilProfessor()

        return instance
    }
}
