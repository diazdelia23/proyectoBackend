require('mocha')
const sinon = require('sinon')
const mongoose = require('mongoose')
const { expect } = require('chai')
const { canciones, getList, getCancion, modificarCancion, eliminarCancion, addCancion } = require('../managers/canciones')
const data = require('../datos')
const Cancion = require('../model/cancion');




describe('Cancion Manager', function () {
    let cancionesPrueba;

    before( function(done) {
        this.enableTimeouts(false)
        mongoose.connect('mongodb://localhost:27017/dbMusica', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('conectado db')
            cancionesPrueba = data
        Cancion.insertMany(cancionesPrueba)
        console.log('inserte en la base')
            done()
        }).catch(err => {})
        
    })

    /*beforeEach(function () {
        this.enableTimeouts(false)
        cancionesPrueba = data
        Cancion.insertMany(cancionesPrueba)
    })*/

    after(function () {
        this.enableTimeouts(false)
        Cancion.collection.drop()
        console.log('elimine de la base')
    })


    it('will get all the canciones', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()

        const res = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await getList(reqMock, res, nextMock).then(() => {

            sinon.assert.calledWith(statusMock, 200)
            sinon.assert.calledWith(jsonMock, cancionesPrueba)
        })
    })


    it('will get una cancion', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2
            }
        }


        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await getCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 200)
            sinon.assert.calledWith(jsonMock, cancionesPrueba[1])
        })

    })


    it('will get una cancion que no existe', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2000
            }
        }

        const response = { error: 'error al obtener la cancion' }

        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await getCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 404)
            sinon.assert.calledWith(jsonMock, response)
        })
    })

    it('will agregar cancion', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            body: {
                cancion: 'Secret Love Song',
                artista: 'Little Mix',
                album: 'Get Weird',
                anio: '2015',
                genero: 'pop'
            }
        }

        cancionesPrueba.push({
            cancion: 'Secret Love Song',
            artista: 'Little Mix',
            album: 'Get Weird',
            anio: '2015',
            genero: 'pop',
            id: 5
        })


        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await addCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 201)
            //sinon.assert.calledWith(jsonMock, cancionesPrueba)
        })
    })

    it('will agregar cancion fallida', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            body: {
                cancion: 'Secret Love Song',
                artista: 'Little Mix',
                album: 'Get Weird',
                anio: '2015'
            }
        }


        const response = { error: 'error al agregar cancion' };

        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await addCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 404)
            sinon.assert.calledWith(jsonMock, response)
        })
    })

    it('will eliminar cancion', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 4
            }
        }


        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await eliminarCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 204)
            //sinon.assert.calledWith(jsonMock, cancionesPrueba)
        })
    })

    it('will eliminar cancion fallida', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2000
            }
        }


        const response = { error: 'hubo un error al eliminar' }

        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await eliminarCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 404)
            sinon.assert.calledWith(jsonMock, response)
        })
    })

    it('will modificar cancion', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2
            },
            body: {
                cancion: 'Love On The Brain',
                artista: 'Rihanna',
                album: 'Anti',
                anio: '2016',
                genero: 'Pop'
            }
        }


        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await modificarCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 204)
            sinon.assert.calledWith(jsonMock, 'modificado')
        })
    })

    it('will modificar cancion mal', async () => {
        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const nextMock = sandbox.stub()
        const sendMock = sandbox.stub()
        const reqMock = {
            params: {
                id: 2
            },
            body: {
                canciones: 'Love On The Brain',
                artista: 'Rihanna',
                album: 'Anti',
                anio: '2016'
            }
        }

        const response = { error: 'hubo un error' }


        const resMock = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        await modificarCancion(reqMock, resMock, nextMock).then(() => {
            sinon.assert.calledWith(statusMock, 404)
            sinon.assert.calledWith(jsonMock, response)
        })
    })
})
