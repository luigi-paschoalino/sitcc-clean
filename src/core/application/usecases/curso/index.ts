import { AdicionarAtividadeCronogramaUsecase } from './AdicionarAtividadeCronograma.usecase'
import { AdicionarCronogramaUsecase } from './AdicionarCronograma.usecase'
import { AtualizarNormaUsecase } from './AtualizarNorma.usecase'
import { CadastrarCursoUsecase } from './CadastrarCurso.usecase'
import { EditarAtividadeCronogramaUsecase } from './EditarAtividadeCronograma.usecase'
import { EditarCursoUsecase } from './EditarCurso.usecase'
import { RemoverAtividadeCronogramaUsecase } from './RemoverAtividadeCronograma.usecase'

const Curso = [
    AdicionarCronogramaUsecase,
    CadastrarCursoUsecase,
    EditarCursoUsecase,
    AdicionarAtividadeCronogramaUsecase,
    EditarAtividadeCronogramaUsecase,
    RemoverAtividadeCronogramaUsecase,
    AtualizarNormaUsecase,
]

export default Curso
