import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { v4 as uuid } from 'uuid'

export class UniqueIdServiceImpl implements UniqueIdService {
    gerarUuid(): string {
        const id = uuid()
        return id
    }
}
