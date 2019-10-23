var express = require('express');
var mongoose = require('mongoose');
const _ = require('underscore');
let canciones = [];


const Cancion = require('../model/cancion');



const getList = (req, res, next) => {

    Cancion.find({}, function (err, canciones) {
        if (err) throw err;
        res.status(200)
        res.json(canciones);
    });
}


const getCancion = (req, res, next) => {
    const { id } = req.params;
    var cancionObtenida;
    Cancion.find({ id: id }, function (err, cancionObtenida) {
        if (err || cancionObtenida.length <= 0) {

            res.status(404)
            res.json({ error: 'error al obtener la cancion' });
        }
        else {
            res.status(200)
            res.json(cancionObtenida);
        };
    })

};


const addCancion = (req, res, next) => {
    const { cancion, artista, album, anio, genero } = req.body;
    if (cancion && artista && album && anio && genero) {
        Cancion.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 }).exec((err, item) => {
            let id = item.id + 1;
            const newCancion = Cancion({ ...req.body, id });
            newCancion.save(function (err) {
                if (err) throw err;
            })

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
const eliminarCancion = (req, res, next) => {
    const { id } = req.params;
    Cancion.findOneAndRemove({ id: id }, function (err) {
        if (err) {
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
const modificarCancion = (req, res, next) => {
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
        Cancion.findOneAndUpdate({ id: id }, { cancion: cancion, artista: artista, album: album, anio: anio, genero: genero }, {new:true}, function (err, cancionNueva) {
            if (err) {
                res.status(404)
                res.json({ error: 'hubo un error' });
            }
            else {
                res.status(204);
                res.json(cancionNueva);
            };
        })

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