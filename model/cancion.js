var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const config = require('config');

const dbConfig = config.get('Mongo.dbConfig');

const conexion = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbName;

//mongoose.connect('mongodb://localhost/dbMusica', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connect(String(conexion), { useUnifiedTopology: true, useNewUrlParser: true });
console.log(config.get('Mongo'));

var cancionSchema = new Schema({
    id: { type: Number, required: true },
    cancion: { type: String, required: true },
    artista: { type: String, required: true },
    album: { type: String, required: true },
    anio: { type: String, required: true },
    genero: { type: String, required: true }
})

var Cancion = mongoose.model('Cancion', cancionSchema);


module.exports = Cancion;