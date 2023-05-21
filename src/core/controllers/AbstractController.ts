import { HttpException } from '@nestjs/common'

export abstract class AbstractController {
    protected exceptionMap: Record<string, number>

    constructor(exceptionMap: Record<string, number>) {
        this.exceptionMap = exceptionMap
    }

    protected handleResponse(data: any) {
        if (data instanceof Error) {
            const status = this.exceptionMap[data.name] || 500
            throw new HttpException(data.message, status)
        }
        return data
    }
}
