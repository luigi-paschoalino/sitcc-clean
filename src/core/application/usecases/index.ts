import { AlterarSenhaUsecase } from './usuario/AlterarSenha.usecase'
import { AutenticarUsecase } from './auth/Autenticar.usecase'
import { AvaliarNotaFinalUsecase } from './tfg/AvaliarNotaFinal.usecase'
import { AvaliarNotaParcialUsecase } from './tfg/AvaliarNotaParcial.usecase'
import { AvaliarOrientacaoUsecase } from './tfg/AvaliarOrientacao.usecase'
import { BaixarTfgUsecase } from './tfg/BaixarTfg.usecase'
import { CadastrarBancaUsecase } from './tfg/CadastrarBanca.usecase'
import { CadastrarCursoUsecase } from './curso/CadastrarCurso.usecase'
import { CadastrarTfgUsecase } from './tfg/CadastrarTfg.usecase'
import { CadastrarUsuarioUseCase } from './usuario/CadastrarUsuario.usecase'
import { EditarCursoUsecase } from './curso/EditarCurso.usecase'
import { EnviarTfgParcialUsecase } from './tfg/EnviarTfgParcial.usecase'
import { GerarCodigoProfessorUsecase } from './codigoProfessor/GerarCodigoProfessor.usecase'
import { RecuperarSenhaUsecase } from './usuario/RecuperarSenha.usecase'
import { ValidarTokenUsecase } from './auth/ValidarToken.usecase'
import { EnviarTfgFinalUsecase } from './tfg/EnviarTfgFinal.usecase'

const UseCases = [
    CadastrarTfgUsecase,
    CadastrarUsuarioUseCase,
    CadastrarCursoUsecase,
    AutenticarUsecase,
    AvaliarOrientacaoUsecase,
    CadastrarBancaUsecase,
    RecuperarSenhaUsecase,
    AlterarSenhaUsecase,
    GerarCodigoProfessorUsecase,
    EnviarTfgParcialUsecase,
    BaixarTfgUsecase,
    AvaliarNotaParcialUsecase,
    AvaliarNotaFinalUsecase,
    ValidarTokenUsecase,
    EditarCursoUsecase,
    EnviarTfgFinalUsecase,
]

export default UseCases
