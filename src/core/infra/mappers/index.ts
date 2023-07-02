import { CursoMapper } from './Curso.mapper'
import { InstitutoMapper } from './Instituto.mapper'
import { UniversidadeMapper } from './Universidade.mapper'
import { UsuarioMapper } from './Usuario.mapper'
import { TccMapper } from './Tcc.mapper'
import { NormaMapper } from './Norma.mapper'
import { PerfilProfessorMapper } from './PerfilProfessor.mapper'
import { CronogramaMapper } from './Cronograma.mapper'
import { ProjetoMapper } from './Projeto.mapper'
import { AtividadeMapper } from './Atividade.mapper'
import { CodigoProfessorMapper } from './CodigoProfessor.mapper'
import { BancaMapper } from './Banca.mapper'
import { EventMapper } from './Event.mapper'

const Mappers = [
    UsuarioMapper,
    UniversidadeMapper,
    InstitutoMapper,
    CursoMapper,
    TccMapper,
    NormaMapper,
    PerfilProfessorMapper,
    CronogramaMapper,
    ProjetoMapper,
    AtividadeMapper,
    CodigoProfessorMapper,
    BancaMapper,
    EventMapper,
]

export default Mappers
