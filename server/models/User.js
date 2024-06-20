const mongoose = require('mongoose');



// Définir le schéma du fournisseur avec le prix du produit inclus
const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: {
      type: String,
      required: true
    },
    prenom: {
      type: String,
      required: true
    },
    birth:{
        type: String,
        required: true
    },
    
    sexe:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    adresse:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    ville:{
        type:String,
        required:true
    },
    qrcode:{
      type:String,
      required:false,
      default:''
    },
    psw:{
      type:String,
      required:true
    },
    traitant:{
        type:String,
        required:false,
        default:"",
        ref:'Medecin'
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
  const User = mongoose.model('User', UserSchema);
  module.exports = User;