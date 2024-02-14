import { AlterarSenhaUsecase } from './AlterarSenha.usecase'
import { AutenticarUsecase } from './Autenticar.usecase'
import { AvaliarNotaFinalUsecase } from './AvaliarNotaFinal.usecase'
import { AvaliarNotaParcialUsecase } from './AvaliarNotaParcial.usecase'
import { AvaliarOrientacaoUsecase } from './AvaliarOrientacao.usecase'
import { BaixarTccUsecase } from './BaixarTcc.usecase'
import { CadastrarBancaUsecase } from './CadastrarBanca.usecase'
import { CadastrarCursoUsecase } from './CadastrarCurso.usecase'
import { CadastrarTccUsecase } from './CadastrarTcc.usecase'
import { CadastrarUsuarioUseCase } from './CadastrarUsuario.usecase'
import { EnviarTccParcialUsecase } from './EnviarTccParcial.usecase'
import { GerarCodigoProfessorUsecase } from './GerarCodigoProfessor.usecase'
import { RecuperarSenhaUsecase } from './RecuperarSenha.usecase'
import { ValidarTokenUsecase } from './ValidarToken.usecase'

const UseCases = [
    CadastrarTccUsecase,
    CadastrarUsuarioUseCase,
    CadastrarCursoUsecase,
    AutenticarUsecase,
    AvaliarOrientacaoUsecase,
    CadastrarBancaUsecase,
    RecuperarSenhaUsecase,
    AlterarSenhaUsecase,
    GerarCodigoProfessorUsecase,
    EnviarTccParcialUsecase,
    BaixarTccUsecase,
    AvaliarNotaParcialUsecase,
    AvaliarNotaFinalUsecase,
    ValidarTokenUsecase,
]

export default UseCases
