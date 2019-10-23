var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myappdatabase', {useUnifiedTopology:true, useNewUrlParser:true});

var cancionSchema = new Schema({
    id: {type: Number, required: true},
    cancion: {type: String, required: true},
    artista: {type: String, required: true},
    album: {type: String, required: true},
    anio: {type: String, required: true},
    genero: {type: String, required: true}
})

var Cancion = mongoose.model('Cancion', cancionSchema);



module.exports = Cancion;