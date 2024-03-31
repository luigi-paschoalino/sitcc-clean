import { BuscarCursoQuery } from './BuscarCurso.query'
import { BuscarTfgQuery } from './BuscarTfg.query'
import { BuscarUsuarioQuery } from './BuscarUsuario.query'
import { BuscarUsuarioHashQuery } from './BuscarUsuarioHash.query'
import { ListarCursosQuery } from './ListarCursos.query'
import { ListarProfessoresQuery } from './ListarProfessores.query'
import { ListarTfgsPorUsuarioQuery } from './ListarTfgsPorUsuario.query'

const Queries = [
    BuscarTfgQuery,
    BuscarUsuarioQuery,
    BuscarCursoQuery,
    ListarProfessoresQuery,
    ListarCursosQuery,
    BuscarUsuarioHashQuery,
    ListarTfgsPorUsuarioQuery,
]

export default Queries
