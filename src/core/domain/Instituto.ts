export class Instituto {
    id: string
    nome: string
    universidade: string

    private constructor() {}

    static criar(id: string, nome: string, universidade: string): Instituto {
        const instituto = new Instituto()
        instituto.id = id
        instituto.nome = nome
        instituto.universidade = universidade
        return instituto
    }
}