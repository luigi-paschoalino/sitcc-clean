import { AlterarSenhaUsecase } from './AlterarSenha.usecase'
import { CadastrarUsuarioUseCase } from './CadastrarUsuario.usecase'
import { RecuperarSenhaUsecase } from './RecuperarSenha.usecase'

const Usuario = [
    AlterarSenhaUsecase,
    CadastrarUsuarioUseCase,
    RecuperarSenhaUsecase,
]

export default Usuario
