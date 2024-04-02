import { BuscarCursoQuery } from './BuscarCurso.query'
import { BuscarTfgQuery } from './BuscarTfg.query'
import { BuscarUsuarioQuery } from './BuscarUsuario.query'
import { BuscarUsuarioHashQuery } from './BuscarUsuarioHash.query'
import { ListarBancasPorUsuarioQuery } from './ListarBancasPorUsuario.query'
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
    ListarBancasPorUsuarioQuery,
]

export default Queries
