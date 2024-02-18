import { BuscarCursoQuery } from './BuscarCurso.query'
import { BuscarTccQuery } from './BuscarTfg.query'
import { BuscarUsuarioQuery } from './BuscarUsuario.query'
import { BuscarUsuarioHashQuery } from './BuscarUsuarioHash.query'
import { ListarCursosQuery } from './ListarCursos.query'
import { ListarProfessoresQuery } from './ListarProfessores.query'

const Queries = [
    BuscarTccQuery,
    BuscarUsuarioQuery,
    BuscarCursoQuery,
    ListarProfessoresQuery,
    ListarCursosQuery,
    BuscarUsuarioHashQuery,
]

export default Queries
