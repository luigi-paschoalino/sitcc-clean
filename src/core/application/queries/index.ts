import { BuscarCursoQuery } from './BuscarCurso.query'
import { BuscarInstitutoQuery } from './BuscarInstituto.query'
import { BuscarTccQuery } from './BuscarTcc.query'
import { BuscarUniversidadeQuery } from './BuscarUniversidade.query'
import { BuscarUsuarioQuery } from './BuscarUsuario.query'
import { ListarProfessoresQuerry } from './ListarProfessores.query'
import { ListarUniversidadesQuery } from './ListarUniversidades.query'

const Queries = [
    BuscarTccQuery,
    BuscarUsuarioQuery,
    BuscarUniversidadeQuery,
    ListarUniversidadesQuery,
    BuscarInstitutoQuery,
    BuscarCursoQuery,
    ListarProfessoresQuerry,
]

export default Queries
