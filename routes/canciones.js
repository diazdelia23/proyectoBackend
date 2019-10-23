var express = require('express');
var router = express.Router();
const { getList, getCancion, modificarCancion, addCancion, eliminarCancion } = require('../managers/canciones');

const _ = require('underscore');


/* GET canciones listing. */
router.get('/', getList);
/*router.get('/', function (req, res, next) {
  if(canciones.lenght > 0)
  {
    res.status(200).json(canciones);
  }
  else{
    res.status(400).json({error: 'error al obtener los datos'});
  }
  
});*/

/*GET UNA CANCIOON*/
router.get('/:id', getCancion);


/*POSTTTTTT*/
router.post('/', addCancion);


/*DELETEEEEEE*/
router.delete('/:id', eliminarCancion);


/*PUUUT*/
router.put('/:id', modificarCancion);

module.exports = router;
