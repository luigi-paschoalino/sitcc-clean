import { Tfg } from './Tfg'
import { TIPO_USUARIO, Usuario } from './Usuario'
import createTfgWithSuccess from '../../../test/mocks/tfg/createTfgWithSuccess.json'
import { STATUS_TFG } from '@prisma/client'

const aluno = Usuario.criar({
    nome: 'Aluno',
    curso: 'Ciência da Computação',
    email: 'aluno@unifei.edu.br',
    matricula: '123456',
    senha: '123456',
    numero: '123456',
    tipo: TIPO_USUARIO.ALUNO,
})

const orientador = Usuario.criar({
    nome: 'Professor',
    curso: 'Ciência da Computação',
    email: 'professor@unifei.edu.br',
    matricula: '1234567',
    numero: '1234567',
    senha: '1234567',
    tipo: TIPO_USUARIO.PROFESSOR,
})

describe('Tfg', () => {
    it('should create an instance', () => {
        if (aluno instanceof Error || orientador instanceof Error)
            throw new Error('usuario is an instance of Error')

        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno: aluno,
            orientador: orientador,
        })
        if (result instanceof Error) throw new Error('result should be Tfg')

        expect(result).toBeTruthy()
        expect(result.getAluno()).toBe(aluno.getId())
        expect(result.getOrientador()).toBe(orientador.getId())
        expect(result.getTitulo()).toBe(createTfgWithSuccess.titulo)
        expect(result.getBibliografia()).toBe(createTfgWithSuccess.bibliografia)
        expect(result.getIntroducao()).toBe(createTfgWithSuccess.introducao)
        expect(result.getObjetivos()).toBe(createTfgWithSuccess.objetivos)
        expect(result.getDescricaoMetodologia()).toBe(
            createTfgWithSuccess.descricaoMetodologia,
        )
        expect(result.getMetodoPesquisa()).toBe(
            createTfgWithSuccess.metodoPesquisa,
        )
        expect(result.getTecnicaPesquisa()).toBe(
            createTfgWithSuccess.tecnicaPesquisa,
        )
        expect(result.getPalavrasChave()).toBe(
            createTfgWithSuccess.palavrasChave,
        )
        expect(result.getStatus()).toBe(STATUS_TFG.MATRICULA_REALIZADA)
        expect(result.getResultados()).toBe(
            createTfgWithSuccess.resultadosEsperados,
        )
    })

    it('should load an instance of Tfg with success', () => {
        if (aluno instanceof Error || orientador instanceof Error)
            throw new Error('usuario is an instance of Error')

        const loadTfgWithSuccess = JSON.parse(
            JSON.stringify(createTfgWithSuccess),
        )
        loadTfgWithSuccess.status = STATUS_TFG.MATRICULA_REALIZADA

        const result = Tfg.carregar(
            {
                ...loadTfgWithSuccess,
                aluno: aluno.getId(),
                orientador: orientador.getId(),
            },
            '1',
        )
        if (result instanceof Error) throw new Error('result should be Tfg')

        expect(result).toBeTruthy()
        expect(result.getAluno()).toBe(aluno.getId())
        expect(result.getOrientador()).toBe(orientador.getId())
        expect(result.getTitulo()).toBe(createTfgWithSuccess.titulo)
        expect(result.getBibliografia()).toBe(createTfgWithSuccess.bibliografia)
        expect(result.getIntroducao()).toBe(createTfgWithSuccess.introducao)
        expect(result.getObjetivos()).toBe(createTfgWithSuccess.objetivos)
        expect(result.getDescricaoMetodologia()).toBe(
            createTfgWithSuccess.descricaoMetodologia,
        )
        expect(result.getMetodoPesquisa()).toBe(
            createTfgWithSuccess.metodoPesquisa,
        )
        expect(result.getTecnicaPesquisa()).toBe(
            createTfgWithSuccess.tecnicaPesquisa,
        )
        expect(result.getPalavrasChave()).toBe(
            createTfgWithSuccess.palavrasChave,
        )
        expect(result.getStatus()).toBe(STATUS_TFG.MATRICULA_REALIZADA)
        expect(result.getResultados()).toBe(
            createTfgWithSuccess.resultadosEsperados,
        )
    })

    it('should return a Tfg DTO', () => {
        if (aluno instanceof Error || orientador instanceof Error)
            throw new Error('usuario is an instance of Error')

        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno: aluno,
            orientador: orientador,
        })
        if (result instanceof Error) throw new Error('result should be Tfg')

        const dto = result.toDTO()
        expect(dto).toBeTruthy()
        expect(dto.id).toBe(result.getId())
        expect(dto.aluno).toBe(result.getAluno())
        expect(dto.orientador).toBe(result.getOrientador())
        expect(dto.coorientador).toBe(result.getCoorientador())
        expect(dto.titulo).toBe(result.getTitulo())
        expect(dto.bibliografia).toBe(result.getBibliografia())
        expect(dto.introducao).toBe(result.getIntroducao())
        expect(dto.objetivos).toBe(result.getObjetivos())
        expect(dto.descricaoMetodologia).toBe(result.getDescricaoMetodologia())
        expect(dto.metodoPesquisa).toBe(result.getMetodoPesquisa())
        expect(dto.tecnicaPesquisa).toBe(result.getTecnicaPesquisa())
        expect(dto.palavrasChave).toBe(result.getPalavrasChave())
        expect(dto.status).toBe(result.getStatus())
        expect(dto.resultados).toBe(result.getResultados())
    })

    it('should return an error because orientador and coorientador are the same', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno: aluno as Usuario,
            orientador: orientador as Usuario,
            coorientador: orientador as Usuario,
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(Error)
        expect(result.message).toBe(
            'O coorientador não pode ser o mesmo que o orientador',
        )
    })
})
