import { AdicionarProjetoUsecase } from './AdicionarProjeto.usecase'
import { AlterarSenhaUsecase } from './AlterarSenha.usecase'
import { AtualizarPerfilProfessorUsecase } from './AtualizarPerfilProfessor.usecase'
import { CadastrarUsuarioUseCase } from './CadastrarUsuario.usecase'
import { EditarProjetoUsecase } from './EditarProjeto.usecase'
import { ExcluirProjetoUsecase } from './ExcluirProjeto.usecase'
import { RecuperarSenhaUsecase } from './RecuperarSenha.usecase'

const Usuario = [
    AlterarSenhaUsecase,
    CadastrarUsuarioUseCase,
    RecuperarSenhaUsecase,
    AtualizarPerfilProfessorUsecase,
    AdicionarProjetoUsecase,
    EditarProjetoUsecase,
    ExcluirProjetoUsecase,
]

export default Usuario
