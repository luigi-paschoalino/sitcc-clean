import {
    MoverTccService,
    MoverTccServiceProps,
} from '../../domain/services/MoverTcc.service'
import * as path from 'path'
import * as fs from 'fs'

export class MoverTccServiceImpl implements MoverTccService {
    constructor(private readonly TCC_FINAL_PATH: string) {}

    async execute(props: MoverTccServiceProps): Promise<Error | string> {
        try {
            const tccFinalPath = path.join(
                this.TCC_FINAL_PATH.replace('$tfgId', props.tccId).replace(
                    '$tfgEntrega',
                    props.tipoEntrega,
                ),
                props.tccId + '.pdf',
            )

            if (!fs.existsSync(path.dirname(tccFinalPath)))
                fs.mkdirSync(path.dirname(tccFinalPath), { recursive: true })

            fs.renameSync(props.path, tccFinalPath)

            return tccFinalPath
        } catch (error) {
            return error
        }
    }
}
