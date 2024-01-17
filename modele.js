const mongoose = require('mongoose');

const monSchema = mongoose.Schema({
  Nom: { type: String, required: false }, //le nom est un champs non obligatoire
  Recommandation: { type: String, required: true },  
  Statut: { type: String, default: 'en attente' },
});

module.exports = mongoose.model('Recommandations', monSchema);