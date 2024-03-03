import { AtividadeDTOMapper } from './AtividadeDTO.mapper'
import { CronogramaDTOMapper } from './CronogramaDTO.mapper'
import { CursoDTOMapper } from './CursoDTO.mapper'
import { NormaDTOMapper } from './NormaDTO.mapper'
import { UsuarioDTOMapper } from './UsuarioDTO.mapper'

const DTOMappers = [
    UsuarioDTOMapper,
    CursoDTOMapper,
    AtividadeDTOMapper,
    CronogramaDTOMapper,
    NormaDTOMapper,
]

export default DTOMappers
