import {
    MoverTfgService,
    MoverTfgServiceProps,
} from '../../domain/services/MoverTfg.service'
import * as path from 'path'
import * as fs from 'fs'

export class MoverTfgServiceImpl implements MoverTfgService {
    constructor(private readonly TCC_FINAL_PATH: string) {}

    async execute(props: MoverTfgServiceProps): Promise<Error | string> {
        try {
            const tccFinalPath = path.join(
                this.TCC_FINAL_PATH.replace('$tfgId', props.tfgId).replace(
                    '$tfgEntrega',
                    props.tipoEntrega,
                ),
                props.tfgId + '.pdf',
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
