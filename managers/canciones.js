var express = require('express');
var mongoose = require('mongoose');
const _ = require('underscore');

let canciones = [];


const Cancion = require('../model/cancion');

var redis = require('redis');
var Redisclient = redis.createClient({host: 'redis-server', port:'6379'}); //creates a new client
var redisActivo = false;
Redisclient.on('connect', function () {
    console.log('connected Redis');
    redisActivo = true;
});

Redisclient.on('error', function(err) {
    console.log(`Redis error: ${err.message}`);
    redisActivo = false;
});



const getList = async (req, res, next) => {
if (redisActivo) {
        Redisclient.exists('llave_list', function (err, reply) {
            if (reply === 1) {
                Redisclient.get('llave_list', function (err, reply) {
                    canciones = JSON.parse(reply)
                    console.log(canciones);
                    console.log('YA EXISTIA')
                    res.status(200)
                    res.json(canciones);
                });
            } else {
                Cancion.find({}, function (err, canciones) {
                    let cancionesString = JSON.stringify(canciones);
                    Redisclient.set('llave_list', cancionesString);
                    Redisclient.expire('llave_list', 150);
                    console.log('NO EXISTIA')
                    res.status(200)
                    res.json(canciones);
                });
            }
        });
    }
    else {
        Cancion.find({}, function (err, canciones) {
            res.status(200)
            res.json(canciones);
        });
    }
    
}


const getCancion = async (req, res, next) => {
    const { id } = req.params;

    if (redisActivo) {
        Redisclient.exists('llave_' + id, function (err, reply) {
            if (reply === 1) {
                Redisclient.get('llave_' + id, function (err, reply) {
                    cancionObtenida = JSON.parse(reply)
                    res.status(200)
                    res.json(cancionObtenida);
                });
            } else {
                Cancion.find({ id: id }, (err, cancionObtenida) => {
                    if (err || cancionObtenida.length <= 0) {
                        res.status(404)
                        res.json({ error: 'error al obtener la cancion' });
                    }
                    else {
                        let cancionString = JSON.stringify(cancionObtenida);
                        Redisclient.set('llave_' + id, cancionString);
                        Redisclient.expire('llave_' + id, 150);
                        res.status(200)
                        res.json(cancionObtenida);
                    };
                })
            }
        });
    }
    else {
        Cancion.find({ id: id }, (err, cancionObtenida) => {
            if (err || cancionObtenida.length <= 0) {
                res.status(404)
                res.json({ error: 'error al obtener la cancion' });
            }
            else {
                res.status(200)
                res.json(cancionObtenida);
            };
        })
    }

};


const addCancion = async (req, res, next) => {
    const { cancion, artista, album, anio, genero } = req.body;
    if (cancion && artista && album && anio && genero) {
        Cancion.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 }).exec((err, item) => {
            if(item != null)
            {
                let id = item.id + 1;
                const newCancion = Cancion({ ...req.body, id });
                newCancion.save(function (err) {
    
                })
            }
            else{
                let id = 1;
                const newCancion = Cancion({ ...req.body, id });
                newCancion.save(function (err) {
    
                })
            }
            

        })
        res.status(201)
        res.send();
    }
    else {
        res.status(404)
        res.json({ error: 'error al agregar cancion' });
    };
};


/*DELETEEEEEE*/
const eliminarCancion = async (req, res, next) => {
    const { id } = req.params;
    Cancion.findOneAndRemove({ id: id }, function (err, cancionEliminada) {
        if (err || !cancionEliminada) {
            res.status(404)
            res.json({ error: 'hubo un error al eliminar' });
        }

        else {
            res.status(204)
            res.send();
        };
    })

};


/*PUUUT*/
const modificarCancion = async (req, res, next) => {
    const { id } = req.params;
    const { cancion, artista, album, anio, genero } = req.body;
    if (cancion && artista && album && anio && genero && id) {
        /*_.each(canciones, (cancioncita, i) => {
            if (cancioncita.id == id) {
                cancioncita.cancion = cancion;
                cancioncita.artista = artista;
                cancioncita.album = album;
                cancioncita.anio = anio;
                cancioncita.genero = genero;
            }

        });*/
        Cancion.findOneAndUpdate({ id: id }, { cancion: cancion, artista: artista, album: album, anio: anio, genero: genero }, { new: true }, function (err, cancionNueva) { });
        res.status(204);
        res.json(cancionNueva);

    }
    else {
        res.status(404)
        res.json({ error: 'hubo un error' });
    }
};

module.exports = {
    getList,
    getCancion,
    addCancion,
    modificarCancion,
    eliminarCancion,
    canciones
};
