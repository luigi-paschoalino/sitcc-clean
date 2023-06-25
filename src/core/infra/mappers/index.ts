import { CursoMapper } from './Curso.mapper'
import { InstitutoMapper } from './Instituto.mapper'
import { UniversidadeMapper } from './Universidade.mapper'
import { UsuarioMapper } from './Usuario.mapper'
import { TccMapper } from './Tcc.mapper'
import { PerfilProfessorMapper } from './PerfilProfessor.mapper'

const Mappers = [
    UsuarioMapper,
    UniversidadeMapper,
    InstitutoMapper,
    CursoMapper,
    TccMapper,
    PerfilProfessorMapper,
]

export default Mappers
