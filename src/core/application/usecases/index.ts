import { CadastrarInstitutoUsecase } from './CadastrarInstituto.usecase'
import { CadastrarTccUsecase } from './CadastrarTcc.usecase'
import { CadastrarUniversidadeUsecase } from './CadastrarUniversidade.usecase'
import { CadastrarUsuarioUseCase } from './CadastrarUsuario.usecase'

const UseCases = [
    CadastrarTccUsecase,
    CadastrarUsuarioUseCase,
    CadastrarUniversidadeUsecase,
    CadastrarInstitutoUsecase,
]

export default UseCases
