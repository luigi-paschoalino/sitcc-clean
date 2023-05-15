import { Universidade } from "../Universidade";

export interface UniversidadeRepository {
    buscarUniversidade(id: number): Promise<Universidade>;
    salvarUniversidade(universidade: Universidade): Promise<void>;
}