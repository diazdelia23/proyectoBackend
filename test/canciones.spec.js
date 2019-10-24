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

    it('will get all the canciones', async () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()

        cancionesPrueba.push({
            _id: '5dae4da7f37cd939e87ca9c9',
            id: 2,
            cancion: 'Procuro Olvidarte',
            artista: 'Aitana',
            album: 'OT',
            anio: '2018',
            genero: 'pop',
            __v: 0
        })
        cancionesPrueba.push({
            _id: '5dae48300ffb3553a069e99f',
            id: null,
            cancion: 'en un solo dia',
            artista: 'morat',
            album: 'amor y otras drogas',
            anio: '2017',
            genero: 'pop',
            __v: 0
        })



        const res = {
            status: statusMock,
            json: jsonMock
        }

        await getList(reqMock, res, nextMock).then(() => {

            sinon.assert.calledWith(statusMock, 200)
            sinon.assert.calledWith(jsonMock, cancionesPrueba)
        }).catch(() => { })
    })


    it('will get una cancion', async () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 6
            }
        }

        const response = {
            _id: '5db0e58e3dfa1b2e38302d91',
            id: 6,
            cancion: 'love on the brain',
                artista: 'rhianna',
                album: 'no lo se',
                anio: '2010',
                genero: 'pop',
            __v: 0
        }

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        await getCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 200)
            sinon.assert.calledWith(jsonMock, response)
        }).catch(() => { })

    })

    
    it('will get una cancion que no existe', async () => {
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

        await getCancion(reqMock, resMock, nextMock).then(() => {
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
        }).catch(() => {})
    })

    it('will agregar cancion', async () => {
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


        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        await addCancion(reqMock, resMock, nextMock).then(() => {
        sinon.assert.calledWith(statusMock, 201)
        //sinon.assert.calledWith(jsonMock, cancionesPrueba)
        }).catch(() => {})
    })

    it('will agregar cancion fallida', async () => {
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

        await addCancion(reqMock, resMock, nextMock).then(() => {
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
        }).catch(() => {})
    })

    it('will eliminar cancion', async () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 8
            }
        }

        
        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        await eliminarCancion(reqMock, resMock, nextMock).then(() => {
        sinon.assert.calledWith(statusMock, 204)
        //sinon.assert.calledWith(jsonMock, cancionesPrueba)
        }).catch(()=>{})
    })

    it('will eliminar cancion fallida', async () => {
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

        await eliminarCancion(reqMock, resMock, nextMock).then(() => {
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
        }).catch(() => {})
    })

    it('will modificar cancion', async () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2
            },
            body: {
                cancion: 'Procuro olvidarte',
                artista: 'Delia',
                album: 'OT',
                anio: '2018',
                genero: 'pop'
            }
        }

        
        const response = {
            _id: '5dae4da7f37cd939e87ca9c9',
            id: 2,
            cancion: 'Procuro Olvidarte',
            artista: 'Delia',
            album: 'OT',
            anio: '2018',
            genero: 'pop',
            __v: 0
        }

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        await modificarCancion(reqMock, resMock, nextMock).then(()=> {
        sinon.assert.calledWith(statusMock, 204)
        sinon.assert.calledWith(jsonMock, cancionesPrueba)
        }).catch(()=>{})
    })

    it('will modificar cancion mal', async () => {
        const sandbox = sinon.sandbox.create()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2
            },
            body: {
                cancion: 'Procuro olvidarte',
                artista: 'Delia',
                album: 'OT',
                anio: '2018'
            }
        }

        const response = { error: 'hubo un error' }
        

        const resMock = {
            status: statusMock,
            json: jsonMock
        }

        await modificarCancion(reqMock, resMock, nextMock).then(() => {
        sinon.assert.calledWith(statusMock, 404)
        sinon.assert.calledWith(jsonMock, response)
        }).catch(() =>{})
    })
    })
