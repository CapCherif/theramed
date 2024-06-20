const mongoose = require('mongoose');



// Définir le schéma du fournisseur avec le prix du produit inclus
const MessageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idmedecin: {
      type: String,
      required: true
    },
    idpatient: {
      type: String,
      required: true
    },
    message_patient:{
        type:String,
        required:false,
        default:""
    },
    message_medecin:{
      type:String,
      required:false,
      default:""
  },
    createdAt: {
      type: Date,
      default: Date.now  // La date par défaut est la date actuelle
    }
    


  });
  
  // Créer le modèle du fournisseur à partir du schéma
  const Message = mongoose.model('Message', MessageSchema);
  module.exports = Message;