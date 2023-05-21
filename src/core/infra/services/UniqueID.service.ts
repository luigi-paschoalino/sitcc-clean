import { Logger } from '@nestjs/common'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { v4 as uuid } from 'uuid'

export class UniqueIdServiceImpl implements UniqueIdService {
    private logger = new Logger()
    gerarUuid(): string {
        const id = uuid()
        this.logger.debug(id)
        return id
    }
}
