const mongoose = require('mongoose');



// Définir le schéma du fournisseur avec le prix du produit inclus
const RdvSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
     
    patient:{
        type:String,
        required:true,
        ref:'User'
    } ,
    patientName:{
      type:String,
      required:false,
      default:''
    },
    medecin:{
        type:String,
        required:false,
        default:''
    },
    status:{
        type:String,
        required:false,
        default:"pending"
    },
    createdAt: {
      type: Date,
      default: Date.now  // La date par défaut est la date actuelle
    }
    


  });
  
  // Créer le modèle du fournisseur à partir du schéma
  const Rdv = mongoose.model('Rdv', RdvSchema);
  module.exports = Rdv;