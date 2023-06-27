import { HttpException, Logger } from '@nestjs/common'

export abstract class AbstractController {
    private logger = new Logger(AbstractController.name)
    protected exceptionMap: Record<string, number>

    constructor(exceptionMap: Record<string, number>) {
        this.exceptionMap = exceptionMap
    }

    protected handleResponse(data: any) {
        if (data instanceof Error) {
            const status = this.exceptionMap[data.name] || 500
            this.logger.error(data.stack)
            throw new HttpException(data.message, status)
        }
        return data
    }
}
