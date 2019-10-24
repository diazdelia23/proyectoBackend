var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/dbMusica', { useUnifiedTopology: true, useNewUrlParser: true });

var cancionSchema = new Schema({
    id: { type: Number, required: true },
    cancion: { type: String, required: true },
    artista: { type: String, required: true },
    album: { type: String, required: true },
    anio: { type: String, required: true },
    genero: { type: String, required: true }
})

var Cancion = mongoose.model('Cancion', cancionSchema);


const newCancion = Cancion({
    id: 1,
    cancion: 'Love on the brain',
    artista: 'Rihanna',
    album: 'Anti',
    anio: '2016',
    genero: 'pop'
});
newCancion.save(function (err) { });


module.exports = Cancion;