import { Logger, Injectable } from '@nestjs/common'
import { GerarCodigoService } from './../../domain/services/GerarCodigo.service'
import crypto from 'crypto'

@Injectable()
export class GerarCodigoServiceImpl implements GerarCodigoService {
    private logger = new Logger(GerarCodigoServiceImpl.name)

    gerarCodigo(): string {
        //gerar codigo com 12 caracteres em base64 e sem caracteres especiais
        const codigo = crypto
            .randomBytes(9)
            .toString('base64')
            .replace(/\W/g, '')
            .slice(0, 12)
        this.logger.debug(`Código gerado: ${codigo}`)
        return codigo
    }
}
