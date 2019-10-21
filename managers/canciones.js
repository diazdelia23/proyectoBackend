var express = require('express');
const _ = require('underscore');
let canciones = [];
canciones = require('../datos.json');



const getList = (req, res, next) => {

        res.status(200)
        res.json(canciones);

}


const getCancion = (req, res, next) => {
    const { id } = req.params;
    var cancionObtenida = [];

    _.each(canciones, (cancion, i) => {
        if (cancion.id == id) {
            cancionObtenida = canciones[i];

        }
    })

    if (cancionObtenida.id > 0) {
        res.status(200)
        res.json(cancionObtenida);
    }
    else {
        res.status(404)
        res.json({ error: 'error al obtener la cancion' });
    }

};


const addCancion = (req, res, next) => {
    const { cancion, artista, album, anio, genero } = req.body;
    if (cancion && artista && album && anio && genero) {
        const id = Math.max.apply(Math, canciones.map(function (o) { return o.id; })) + 1;
        const newCancion = { ...req.body, id };
        canciones.push(newCancion);
        res.status(201)
        res.json(canciones);
    }
    else {
        res.status(404)
        res.json({ error: 'error al agregar cancion' });
    };
};


/*DELETEEEEEE*/
const eliminarCancion = (req, res, next) => {
    const { id } = req.params;
    let removedItem = [];
    _.each(canciones, (cancion, i) => {
        if (cancion.id == id) {
            removedItem = canciones.splice(i, 1);
        }
    })
    
    
    if (removedItem[0]) {
        res.status(204)
        res.json(canciones);
    }
    else {
        res.status(404)
        res.json({ error: 'hubo un error al eliminar' });
    }


};


/*PUUUT*/
const modificarCancion = (req, res, next) => {
    const { id } = req.params;
    const { cancion, artista, album, anio, genero } = req.body;
    if (cancion && artista && album && anio && genero && id) {
        _.each(canciones, (cancioncita, i) => {
            if (cancioncita.id == id) {
                cancioncita.cancion = cancion;
                cancioncita.artista = artista;
                cancioncita.album = album;
                cancioncita.anio = anio;
                cancioncita.genero = genero;
            }

        });
        res.status(204)
        res.json(canciones);
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