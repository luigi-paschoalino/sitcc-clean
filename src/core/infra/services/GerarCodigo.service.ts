import { Logger, Injectable } from '@nestjs/common'
import cryptoRandomString from 'crypto-random-string'
import { GerarCodigoService } from './../../domain/services/GerarCodigo.service'

@Injectable()
export class GerarCodigoServiceImpl implements GerarCodigoService {
    private logger = new Logger(GerarCodigoServiceImpl.name)

    gerarCodigo(): string {
        const codigo = cryptoRandomString({ length: 10, type: 'base64' })
        this.logger.debug(`Código gerado: ${codigo}`)
        return codigo
    }
}
