import { AdicionarProjetoUsecase } from './AdicionarProjeto.usecase'
import { AlterarSenhaUsecase } from './AlterarSenha.usecase'
import { AtualizarPerfilProfessorUsecase } from './AtualizarPerfilProfessor.usecase'
import { CadastrarUsuarioUseCase } from './CadastrarUsuario.usecase'
import { RecuperarSenhaUsecase } from './RecuperarSenha.usecase'

const Usuario = [
    AlterarSenhaUsecase,
    CadastrarUsuarioUseCase,
    RecuperarSenhaUsecase,
    AtualizarPerfilProfessorUsecase,
    AdicionarProjetoUsecase,
]

export default Usuario
