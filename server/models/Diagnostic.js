const mongoose = require('mongoose');



// Définir le schéma du fournisseur avec le prix du produit inclus
const DiagSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chez: {
      type: String,
      required: true
    },
    resultat: {
      type: String,
      required: true
    },
    traitant:{
        type:String,
        required:true,
        ref:'Medecin'
    },  
    patient:{
        type:String,
        required:true,
        ref:'User'
    } ,
    createdAt: {
      type: Date,
      default: Date.now  // La date par défaut est la date actuelle
    }
    


  });
  
  // Créer le modèle du fournisseur à partir du schéma
  const Diagnostic = mongoose.model('Diagnostic', DiagSchema);
  module.exports = Diagnostic;