import { Tfg } from './Tfg'
import { TIPO_USUARIO, Usuario } from './Usuario'
import createTfgWithSuccess from '../../../test/mocks/tfg/createTfgWithSuccess.json'
import { STATUS_TFG } from './Tfg'
import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'

const aluno = Usuario.criar({
    nome: 'Aluno',
    curso: 'Ciência da Computação',
    email: 'aluno@unifei.edu.br',
    matricula: '123456',
    senha: '123456',
    numero: '123456',
    tipo: TIPO_USUARIO.ALUNO,
}) as Usuario

const orientador = Usuario.criar({
    nome: 'Professor',
    curso: 'Ciência da Computação',
    email: 'professor@unifei.edu.br',
    matricula: '1234567',
    numero: '1234567',
    senha: '1234567',
    tipo: TIPO_USUARIO.PROFESSOR,
}) as Usuario

const coorientador = Usuario.criar({
    nome: 'Professor 2',
    curso: 'Sistemas de Informação',
    email: 'professor2@unifei.edu.br',
    matricula: '1234567',
    numero: '1234567',
    senha: '1234567',
    tipo: TIPO_USUARIO.PROFESSOR,
}) as Usuario

describe('Tfg', () => {
    it('should create an instance', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            coorientador,
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

    it('should return an error because orientador is not a professor', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador: aluno,
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Usuário informado não é um professor')
    })

    it('should return an error because coorientador is not a professor', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            coorientador: aluno,
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Usuário informado não é um professor')
    })

    it('should return an error because aluno is not a student', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno: orientador,
            orientador,
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Usuário informado não é um aluno')
    })

    it('should return an error because titulo is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            titulo: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Título não informado')
    })

    it('should return an error because bibliografia is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            bibliografia: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Bibliografia não informada')
    })

    it('should return an error because introducao is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            introducao: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Introdução não informada')
    })

    it('should return an error because objetivos is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            objetivos: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Objetivos não informados')
    })

    it('should return an error because descricaoMetodologia is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            descricaoMetodologia: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Descrição da metodologia não informada')
    })

    it('should return an error because metodoPesquisa is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            metodoPesquisa: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Método de pesquisa não informado')
    })

    it('should return an error because tecnicaPesquisa is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            tecnicaPesquisa: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Técnica de pesquisa não informada')
    })

    it('should return an error because palavrasChave is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            palavrasChave: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Palavras-chave não informadas')
    })

    it('should return an error because resultadosEsperados is empty', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador,
            resultadosEsperados: '',
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Resultados esperados não informados')
    })

    it('should return an error because aluno is not defined', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            orientador,
            aluno: null as Usuario,
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Aluno não informado')
    })

    it('should return an error because orientador is not defined', () => {
        const result = Tfg.criar({
            ...createTfgWithSuccess,
            aluno,
            orientador: null as Usuario,
        })
        if (result instanceof Tfg) throw new Error('should be Error')

        expect(result).toBeInstanceOf(InvalidPropsException)
        expect(result.message).toBe('Orientador não informado')
    })
})
