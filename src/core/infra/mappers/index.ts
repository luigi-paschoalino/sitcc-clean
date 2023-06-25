import { CursoMapper } from './Curso.mapper'
import { InstitutoMapper } from './Instituto.mapper'
import { UniversidadeMapper } from './Universidade.mapper'
import { UsuarioMapper } from './Usuario.mapper'
import { TccMapper } from './Tcc.mapper'
import { NormaMapper } from './Norma.mapper'
import { PerfilProfessorMapper } from './PerfilProfessor.mapper'
import { CronogramaMapper } from './Cronograma.mapper'

const Mappers = [
    UsuarioMapper,
    UniversidadeMapper,
    InstitutoMapper,
    CursoMapper,
    TccMapper,
    NormaMapper,
    PerfilProfessorMapper,
    CronogramaMapper,
]

export default Mappers
