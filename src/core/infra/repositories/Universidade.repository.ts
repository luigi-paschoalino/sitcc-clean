import { Universidade } from "src/core/domain/Universidade";
import { UniversidadeRepository } from "src/core/domain/repositories/Universidade.repository";

export class UniversidadeRepositoryImpl implements UniversidadeRepository {
    async buscarUniversidade(id: number): Promise<Universidade> {
        return    
    }

    async salvarUniversidade(universidade: Universidade): Promise<void> {
        return
    }
}