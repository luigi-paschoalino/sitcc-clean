import { AtividadeDTOMapper } from './AtividadeDTO.mapper'
import { CronogramaDTOMapper } from './CronogramaDTO.mapper'
import { CursoDTOMapper } from './CursoDTO.mapper'
import { NormaDTOMapper } from './NormaDTO.mapper'
import { PerfilProfessorDTOMapper } from './PerfilProfessorDTO.mapper'
import { ProjetoDTOMapper } from './ProjetoDTO.mapper'
import { UsuarioDTOMapper } from './UsuarioDTO.mapper'

const DTOMappers = [
    UsuarioDTOMapper,
    CursoDTOMapper,
    AtividadeDTOMapper,
    CronogramaDTOMapper,
    NormaDTOMapper,
    PerfilProfessorDTOMapper,
    ProjetoDTOMapper,
]

export default DTOMappers
