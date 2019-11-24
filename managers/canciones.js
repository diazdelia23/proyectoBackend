var express = require('express');
var mongoose = require('mongoose');
const _ = require('underscore');
let canciones = [];


const Cancion = require('../model/cancion');



const getList = async (req, res, next) => {

    await Cancion.find({}, {_id:0, __v:0}, (err, canciones) => {
        res.status(200)
        res.json(JSON.parse(JSON.stringify(canciones)));
    });
}


const getCancion = async (req, res, next) => {
    const { id } = req.params;
    await Cancion.find({ id: id }, {_id:0, __v:0}, (err, cancionObtenida) => {
        if (cancionObtenida.length <= 0) {
            res.status(404)
            res.json({ error: 'error al obtener la cancion' });
        }
        else {
            res.status(200)
            res.json(JSON.parse(JSON.stringify(cancionObtenida[0])));
        };
    })

};


const addCancion = async (req, res, next) => {
    const { cancion, artista, album, anio, genero } = req.body;
    if (cancion && artista && album && anio && genero) {
        await Cancion.findOne({}, { id: 1, _id: 0 }).sort({ id: -1 }).exec( async (err, item) => {
            let id = item.id + 1;
            const newCancion = Cancion({ ...req.body, id });
            await newCancion.save(function (err) {

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
const eliminarCancion = async (req, res, next) => {
    const { id } = req.params;
    await Cancion.findOneAndRemove({ id: id }, function (err, cancionEliminada) {
        if (!cancionEliminada) {
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
        await Cancion.findOneAndUpdate({ id: id }, { cancion: cancion, artista: artista, album: album, anio: anio, genero: genero }, { new: true }, function (err, cancionNueva) { });
        res.status(204);
        res.json('modificado');

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