import {
    MoverTccService,
    MoverTccServiceProps,
} from '../../domain/services/MoverTcc.service'
import * as path from 'path'
import * as fs from 'fs'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { Inject } from '@nestjs/common'

export class MoverTccServiceImpl implements MoverTccService {
    constructor(
        @Inject('TccRepository') private readonly tccRepository: TccRepository,
    ) {}

    async execute(props: MoverTccServiceProps): Promise<Error | void> {
        try {
        } catch (error) {
            return error
        }
    }
}
