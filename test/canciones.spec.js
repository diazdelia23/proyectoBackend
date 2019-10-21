require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { canciones, getList, getCancion, modificarCancion, eliminarCancion, addCancion } = require('../managers/canciones')

describe('Cancion Manager', () => {
    let cancionesPrueba = [];
    /*beforeEach(() => {
        cancionesPrueba = []
        canciones.splice(0, canciones.length)
    })*/

    it('will get all the canciones', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()

        cancionesPrueba.push({
            id: 1,
            cancion: 'Vas a quedarte',
            artista: 'Aitana',
            album: 'Spoiler',
            anio: '2018',
            genero: 'pop'
        })
        cancionesPrueba.push({
            id: 5,
            cancion: 'en un solo dia',
            artista: 'morat',
            album: 'amor y otras drogas',
            anio: '2017',
            genero: 'pop'
        })

        const res = {
            status: statusMock,
            json: jsonMock
        }

        getList(reqMock, res, nextMock)
        sinon.assert.calledWith(statusMock, 200)
        sinon.assert.calledWith(jsonMock, cancionesPrueba)
    })


    it('will get una cancion', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 5
            }
        }

        const response = {
            id: 5,
            cancion: 'en un solo dia',
            artista: 'morat',
            album: 'amor y otras drogas',
            anio: '2017',
            genero: 'pop'
        }

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        getCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 200)
        sinon.assert.calledWith(jsonMock, response)
    })

    it('will get una cancion que no existe', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2000
            }
        }

        const response = { error: 'error al obtener la cancion' }

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        getCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
    })

    it('will agregar cancion', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            body: {
                cancion: 'love on the brain',
                artista: 'rhianna',
                album: 'no lo se',
                anio: '2010',
                genero: 'pop'
            }
        }

        
        cancionesPrueba.push({
            id: 6,
            cancion: 'love on the brain',
            artista: 'rhianna',
            album: 'no lo se',
            anio: '2010',
            genero: 'pop'
        })

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        addCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 201)
        sinon.assert.calledWith(jsonMock, cancionesPrueba)
    })

    it('will agregar cancion fallida', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            body: {
                cancion: 'love on the brain',
                artista: 'rhianna',
                album: 'no lo se',
                anio: '2010'
            }
        }

        
        const response = { error: 'error al agregar cancion' };

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        addCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
    })

    it('will eliminar cancion', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 6
            }
        }

        
        cancionesPrueba.splice(2,1)

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        eliminarCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 204)
        sinon.assert.calledWith(jsonMock, cancionesPrueba)
    })

    it('will eliminar cancion fallida', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2000
            }
        }

        
        const response = {error: 'hubo un error al eliminar'}

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        eliminarCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
    })

    it('will modificar cancion', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 5
            },
            body: {
                cancion: 'love on the brain',
                artista: 'rhianna',
                album: 'no lo se',
                anio: '2010',
                genero: 'pop'
            }
        }

        
        cancionesPrueba[1].cancion = 'love on the brain';
        cancionesPrueba[1].artista ='rhianna';
        cancionesPrueba[1].album ='no lo se';
        cancionesPrueba[1].anio ='2010';
        cancionesPrueba[1].genero ='pop';

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        modificarCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 204)
        sinon.assert.calledWith(jsonMock, cancionesPrueba)
    })

    it('will modificar cancion mal', () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 5
            },
            body: {
                cancion: 'love on the brain',
                artista: 'rhianna',
                album: 'no lo se',
                anio: '2010'
            }
        }

        const response = { error: 'hubo un error' }
        

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        modificarCancion(reqMock, resMock, nextMock)
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
    })

})
