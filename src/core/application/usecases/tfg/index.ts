import { AvaliarNotaFinalUsecase } from './AvaliarNotaFinal.usecase'
import { AvaliarNotaParcialUsecase } from './AvaliarNotaParcial.usecase'
import { AvaliarOrientacaoUsecase } from './AvaliarOrientacao.usecase'
import { BaixarTfgUsecase } from './BaixarTfg.usecase'
import { CadastrarBancaUsecase } from './CadastrarBanca.usecase'
import { CadastrarTfgUsecase } from './CadastrarTfg.usecase'
import { EditarBancaUsecase } from './EditarBanca.usecase'
import { EnviarTfgFinalUsecase } from './EnviarTfgFinal.usecase'
import { EnviarTfgParcialUsecase } from './EnviarTfgParcial.usecase'

const Tfg = [
    CadastrarTfgUsecase,
    AvaliarOrientacaoUsecase,
    CadastrarBancaUsecase,
    EnviarTfgParcialUsecase,
    BaixarTfgUsecase,
    AvaliarNotaParcialUsecase,
    AvaliarNotaFinalUsecase,
    EnviarTfgFinalUsecase,
    EditarBancaUsecase,
]

export default Tfg
