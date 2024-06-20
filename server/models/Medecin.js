const mongoose = require('mongoose');



// Définir le schéma du fournisseur avec le prix du produit inclus
const MedecinSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: {
      type: String,
      required: true
    },
    prenom: {
      type: String,
      required: true
    },
   
    spec:{
        type:String,
        requried:true
    },
    
    phone:{
        type:String,
        requried:true
    },
    adresse:{
      type:String,
      required:true
    },
    email:{
      type:String,
      requried:true
    },
    
    psw:{
      type:String,
      requried:true
    },
    
    confirme:{
      type:Number,
      default:0
    },
    
    createdAt: {
      type: Date,
      default: Date.now  // La date par défaut est la date actuelle
    }
    


  });
  
  // Créer le modèle du fournisseur à partir du schéma
  const Medecin = mongoose.model('Medecin', MedecinSchema);
  module.exports = Medecin;