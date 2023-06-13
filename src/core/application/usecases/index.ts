import { CadastrarCursoUsecase } from './CadastrarCurso.usecase'
import { CadastrarInstitutoUsecase } from './CadastrarInstituto.usecase'
import { CadastrarTccUsecase } from './CadastrarTcc.usecase'
import { CadastrarUniversidadeUsecase } from './CadastrarUniversidade.usecase'
import { CadastrarUsuarioUseCase } from './CadastrarUsuario.usecase'

const UseCases = [
    CadastrarTccUsecase,
    CadastrarUsuarioUseCase,
    CadastrarUniversidadeUsecase,
    CadastrarInstitutoUsecase,
    CadastrarCursoUsecase,
]

export default UseCases
