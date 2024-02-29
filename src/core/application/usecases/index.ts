import Auth from './auth'
import { GerarCodigoProfessorUsecase } from './codigoProfessor/GerarCodigoProfessor.usecase'
import Curso from './curso'
import Tfg from './tfg'
import Usuario from './usuario'

const UseCases = [
    ...Usuario,
    ...Tfg,
    ...Curso,
    ...Auth,
    GerarCodigoProfessorUsecase,
]

export default UseCases
