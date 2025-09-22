const mongoose = require("mongoose");

const candidatureSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  situationFamiliale: String,
  niveauEtude: String,
  posteChoisi: String,
  cv: String, // nom du fichier
}, { timestamps: true });

module.exports = mongoose.model("Candidature", candidatureSchema);
