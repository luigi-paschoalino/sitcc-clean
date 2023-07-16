import { AlterarSenhaUsecase } from './AlterarSenha.usecase'
import { AutenticarUsecase } from './Autenticar.usecase'
import { AvaliarOrientacaoUsecase } from './AvaliarOrientacao.usecase'
import { CadastrarBancaUsecase } from './CadastrarBanca.usecase'
import { CadastrarCursoUsecase } from './CadastrarCurso.usecase'
import { CadastrarInstitutoUsecase } from './CadastrarInstituto.usecase'
import { CadastrarTccUsecase } from './CadastrarTcc.usecase'
import { CadastrarUniversidadeUsecase } from './CadastrarUniversidade.usecase'
import { CadastrarUsuarioUseCase } from './CadastrarUsuario.usecase'
import { EnviarTccParcialUsecase } from './EnviarTccParcial.usecase'
import { GerarCodigoProfessorUsecase } from './GerarCodigoProfessor.usecase'
import { RecuperarSenhaUsecase } from './RecuperarSenha.usecase'

const UseCases = [
    CadastrarTccUsecase,
    CadastrarUsuarioUseCase,
    CadastrarUniversidadeUsecase,
    CadastrarInstitutoUsecase,
    CadastrarCursoUsecase,
    AutenticarUsecase,
    AvaliarOrientacaoUsecase,
    CadastrarBancaUsecase,
    RecuperarSenhaUsecase,
    AlterarSenhaUsecase,
    GerarCodigoProfessorUsecase,
    EnviarTccParcialUsecase,
]

export default UseCases
