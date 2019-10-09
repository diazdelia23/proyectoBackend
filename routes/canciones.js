var express = require('express');
var router = express.Router();

const _ = require('underscore');

const canciones = require('../datos.json');
console.log(canciones);

/* GET canciones listing. */
router.get('/', function (req, res, next) {
  if(canciones.lenght > 0)
  {
    res.status(200).json(canciones);
  }
  else{
    res.status(400).json({error: 'error al obtener los datos'});
  }
  
});

/*GET UNA CANCIOON*/
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  var cancionObtenida= [];
  _.each(canciones, (cancion, i) => {
    if (cancion.id == id) {
      cancionObtenida = canciones[i];
    }
  })

  if (cancionObtenida.length > 0)
  {
    res.status(200).json(cancionObtenida);
  }
  else
  {
    res.status(404).json({error: 'error al obtener la cancion'});
  }
  
});


/*POSTTTTTT*/

router.post('/', function (req, res, next) {
  const { cancion, artista, album, anio, genero } = req.body;
  if (cancion && artista && album && anio && genero) {
    const id = Math.max.apply(Math, canciones.map(function (o) { return o.id; })) + 1;
    const newCancion = { ...req.body, id };
    canciones.push(newCancion);
    res.status(201).json(canciones);
  }
  else {
    res.status(404).json({ error: 'error' });
  };
});


/*DELETEEEEEE*/
router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  _.each(canciones, (cancion, i) => {
    if (cancion.id == id) {
      let removedItem = canciones.splice(i, 1);
    }
  })

  if(removedItem.id == id)
  {
    res.status(204).json(canciones);
  }
  else{
    res.status(404).json({error: 'hubo un error al eliminar'});
  }
  
 
});


/*PUUUT*/
router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { cancion, artista, album, anio, genero } = req.body;
  if (cancion && artista && album && anio && genero) {
    _.each(canciones, (cancioncita, i) => {
      if (cancioncita.id == id) {
        cancioncita.cancion = cancion;
        cancioncita.artista = artista;
        cancioncita.album = album;
        cancioncita.anio = anio;
        cancioncita.genero = genero;
      }
      
    });
    res.status(204).json(canciones);
  }
  else {
    res.status(404).json({ error: 'hubo un error' });
  }
});

module.exports = router;
