export interface InstitutoDTO {
    id: string
    nome: string
    cursos?: {
        id: string
        nome: string
    }[]
    universidade: {
        id: string
        nome: string
    }
}
