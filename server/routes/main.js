const express = require('express');
const fs = require('fs')

const router = express.Router();
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const User = require('../models/User')
const Medecin = require('../models/Medecin')



router.get('/', async(req, res)=>{ 
 
    var locals = {
        title:"Accueil",
    }
  
    res.render('index', {locals,  
                        login:req.session.login ? req.session.login : false, 
                        page:"home", 
                        _id: req.session._id ? req.session._id: false,
                        fullname:req.session.fullname ? req.session.fullname : false 
                    })

})






router.get('/signup', async(req, res)=>{ 
 
    var locals = {
        title:"Signup Page",
    }

    if(!req.session.login){
        req.session.login = false;
    }
    if(req.session.login){
        res.redirect('/compte')
    }
  
    res.render('signup', {locals,
                        login:req.session.login ? req.session.login : false, 
                        page:"signup", 
                        
                        _id: req.session._id ? req.session._id: false,
                        fullname:req.session.fullname ? req.session.fullname : false 
                    })

})



router.get('/signup-medecin', async(req, res)=>{ 
 
    var locals = {
        title:"Signup Medecin page",
    }

    if(!req.session.login){
        req.session.login = false;
    }
    if(req.session.login){
        res.redirect('/compte-medecin')
    }
  
    res.render('signup-medecin', {locals,
                        login:req.session.login ? req.session.login : false, 
                        page:"", 
                         
                    })

})



router.post('/signup', async (req,res)=>{
    const resultat = await User.findOne({
        email: req.body.email,
        // numero_registre: req.body.numero_registre
    });

    if(resultat){
        res.json({err:"Cet utilisateur existe dèja."})
    }
    else{

        // saving to db
        // const hashedPassword = await bcrypt.hash(req.body.psw, 10);
        var nouvellePersonne = new User({
            _id: new mongoose.Types.ObjectId(),
            nom:req.body.nom,
            prenom:req.body.prenom,
            birth:req.body.birth,
            adresse:req.body.adresse,
            phone:req.body.phone,
            ville:req.body.ville,
            email:req.body.email,            
                    
            sexe:req.body.sexe,            
            psw:req.body.psw
        })

        await nouvellePersonne.save();
        // init session
        // req.session.login=true
        // req.session._id = nouvellePersonne._id;
        // req.session.fullname = nouvellePersonne.firstname + " " + nouvellePersonne.lastname;
        // req.session.email = nouvellePersonne.email;
        // req.session.confirmed = 0;

        res.json({done:true})
    }
})


router.post('/signup-medecin', async (req,res)=>{
    const resultat = await Medecin.findOne({
        email: req.body.email,
        // numero_registre: req.body.numero_registre
    });

    if(resultat){
        res.json({err:"Cet utilisateur existe dèja."})
    }
    else{

        // saving to db
        // const hashedPassword = await bcrypt.hash(req.body.psw, 10);
        var nouvellePersonne = new Medecin({
            _id: new mongoose.Types.ObjectId(),
            nom:req.body.nom,
            prenom:req.body.prenom,
            adresse:req.body.adresse,
            phone:req.body.phone,
            email:req.body.email,            
            spec:req.body.spec,
            psw:req.body.psw
        })

        await nouvellePersonne.save();
        // init session
        // req.session.login=true
        // req.session._id = nouvellePersonne._id;
        // req.session.fullname = nouvellePersonne.firstname + " " + nouvellePersonne.lastname;
        // req.session.email = nouvellePersonne.email;
        // req.session.confirmed = 0;

        res.json({done:true})
    }
})




router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/')
})




router.get('/login', async(req, res)=>{ 
 
    var locals = {
        title:"Signin Page",
    }

    if(!req.session.login){
        req.session.login = false;
    }
    if(req.session.login){
        res.redirect('/compte')
    }
  
    res.render('signin', {locals,
                        login: false, 
                        page:"signin", 
                        locpage:"main",
                        fullname:req.session.fullname ? req.session.fullname : false 
                    })

})

router.post('/signin', async(req, res)=>{
    var user = await User.findOne({email:req.body.email})
    // check if the client is not connected somewhereelse

    if(user){
        // const isPasswordValid = await bcrypt.compare(owner.psw, req.body.psw);
        // console.log("is password valid:", isPasswordValid)
        if(user.psw == req.body.psw){
            // vérifier si le user n'est pas connecté dans la bd

            // if(user.login == 1){
            //     res.json({err:"Cette Session est déja Ouverte !"})
            // }
            // else{
                // await User.findByIdAndUpdate(user._id, { login: 1 });
                // création de la session
                req.session.login = true;
                req.session._id = user._id;
                req.session.fullname = user.nom + " " + user.prenom;
                req.session.email = user.email
                req.session.qrcode=user.qrcode
                res.json({login:true})
            // }
            
        }
        else{
            res.json({login:false})
        }
    }
    else{
        res.json({login:false})
    }
})

router.get('/compte', async(req, res)=>{
    var locals = {
        title:"compte"
    }
    if(req.session.login){
        var messages = await Message.find({idpatient:req.session._id})
        res.render('compte', {locals, messages,
            login: true, 
            page:"compte", 
            email:req.session.email,
            qrcode:req.session.qrcode,
            fullname:req.session.fullname ? req.session.fullname : false })
    }
    else{
        res.redirect('/')
    }
})




router.get('/signin-medecin', async(req, res)=>{ 
 
    var locals = {
        title:"Signin Page",
    }

    if(!req.session.login){
        req.session.login = false;
    }
    if(req.session.login){
        res.redirect('/compte-medecin')
    }
  
    res.render('signin-medecin', {locals,
                        login: false, 
                        page:"", 
                        locpage:"main",
                        fullname:req.session.fullname ? req.session.fullname : false 
                    })

})
router.post('/signin-medecin', async(req, res)=>{
    var medecin = await Medecin.findOne({email:req.body.email})
    // check if the client is not connected somewhereelse

    if(medecin){
        // const isPasswordValid = await bcrypt.compare(owner.psw, req.body.psw);
        // console.log("is password valid:", isPasswordValid)
        if(medecin.psw == req.body.psw){
            // vérifier si le user n'est pas connecté dans la bd

            // if(user.login == 1){
            //     res.json({err:"Cette Session est déja Ouverte !"})
            // }
            // else{
                // await User.findByIdAndUpdate(user._id, { login: 1 });
                // création de la session
                req.session.loginMedecin = true;
                req.session._id = medecin._id;
              
                req.session.email = medecin.email
                res.json({login:true})
            // }
            
        }
        else{
            res.json({login:false})
        }
    }
    else{
        res.json({login:false})
    }
})



router.get('/compte-medecin', async(req, res)=>{
    var locals = {
        title:"compte"
    }
    if(req.session.loginMedecin){
        var patients = await User.find({traitant:req.session._id})
        res.render('compte-medecin', {locals,
            login: true, 
            patients,
            page:"compte", 
            email:req.session.email,
            fullname:req.session.fullname ? req.session.fullname : false })
    }
    else{
        res.redirect('/')
    }
})


router.get('/message_med', async(req, res)=>{
    const messages = await Message.find({idmedecin:req.session._id, idpatient:req.query.id})
    var locals = {
        title:"compte"
    }
    if(req.session.loginMedecin){
        res.render('message_med', {
            locals,
            loginMedecin: true, 
            login:true,
            queryid:req.query.id,
            messages,
            page:"compte", 
            email:req.session.email,
            fullname:req.session.fullname ? req.session.fullname : false
        })
    }

    else{
        res.redirect('/signup-medecin')
    }
})



const Diagnostic = require('../models/Diagnostic')
const Message = require('../models/Message')
const Rdv = require('../models/Rdv')

router.get('/voir/detail', async(req, res)=>{
    var locals = {
        title:"compte-medecin"
    }
    if(req.session.loginMedecin){
        var patient = await User.findOne({_id:req.query.id})
        var diagnostic = await Diagnostic.find({traitant:req.session._id, patient:patient._id})

        res.render('voir',{locals,
            loginMedecin: true, 
            login: true, 
            user:patient,
            diagnostic,
            page:"compte", 
            _id:req.session._id,
            email:req.session.email,
            fullname:req.session.fullname ? req.session.fullname : false})
    }

    else{
        res.redirect('/')
    }
})

router.post('/submit-diagnostic', async(req, res)=>{
    const chez = req.body.chez
    const resultat = req.body.resultat
    var nd = new Diagnostic({
        _id: new mongoose.Types.ObjectId(),
        chez:chez,
        resultat:resultat,
        traitant:req.session._id,
        patient:req.body.idpatient
    })

    await nd.save()
    res.json({done:true})
})


router.post('/envoi-msg', async(req, res)=>{
    var message_provenance = req.body.message_provenance
    var msg = req.body.msg
    var patient;
    
    if(message_provenance == "patient"){
        patient = await User.findOne({_id:req.session._id})
        console.log(patient)
        var message = new Message({
            _id: new mongoose.Types.ObjectId(),
            idmedecin:patient.traitant,
            idpatient:req.session._id,
            message_patient:msg,
            message_medecin:"",
        })

        await message.save()
        
    }
    else{
        // patient = await Medecin.findOne({_id:req.session._id})
        var message = new Message({
            _id: new mongoose.Types.ObjectId(),
            idmedecin:req.session._id,
            idpatient:req.body.idpatient,
            message_patient:"",
            message_medecin:msg,
        })
        await message.save()
    }

    res.json({done:true})
})



router.get('/prendre-rdv', async(req, res)=>{
    var locals = {
        title:"Prise de rendez-vous"
    }
    const rdvs = await Rdv.find({patient:req.session._id}).sort({createdAt:-1}).limit(10)
    console.log(rdvs)
    if(req.session.login){
        res.render("prendre-rdv", {
            locals,
            rdvs,
            login: true, 
            qrcode:req.session.qrcode,
            page:"compte", 
            _id:req.session._id,
            email:req.session.email,
            fullname:req.session.fullname ? req.session.fullname : false
        })
    }

    else{
        res.redirect('/')
    }
})

router.get('/medecins-rdv', async(req, res)=>{
    const rdvs = await Rdv.find({medecin:req.session._id})
    console.log(rdvs)
    var locals = {
        title:"Page"
    }
    if(req.session.loginMedecin){
        res.render('medecins-rdv', {
            locals,
            rdvs,
            login: true, 
            
            page:"compte", 
            _id:req.session._id,
            email:req.session.email,
            fullname:req.session.fullname ? req.session.fullname : false
        })
    }
    else{
        res.redirect('/')
    }
})

router.post('/prendre-rdv', async(req, res)=>{
    var idpatient = req.session._id
    var medecin = await User.findOne({_id:req.session._id})
    // medecin = medecin.traitant;

    var date = req.body.date
    var object = req.body.object
    var rdv = new Rdv({
        _id: new mongoose.Types.ObjectId(),
        title:object,
        patient:idpatient,
        patientName:req.session.fullname,
        medecin:medecin.traitant,
        date:date
    })

    await rdv.save()
    res.json({done:true, id:rdv._id})
})


router.post('/delete-rdv', async(req, res)=>{
    await Rdv.findOneAndDelete({_id:req.body.id})
    res.json({done:true})
})

router.post('/accept-rdv', async(req,res)=>{
    await Rdv.findOneAndUpdate({_id:req.body.id}, {status:'accepted'})
    res.json({done:true})
})

router.post('/decline-rdv', async(req,res)=>{
    await Rdv.findOneAndUpdate({_id:req.body.id}, {status:'refused'})
    res.json({done:true})
})



router.post('/search-for-patient', async(req, res)=>{
    var oid = new mongoose.Types.ObjectId(req.body.id);
    var patient = await User.findOne({_id: oid})
    if(patient){
        res.json({done:true, user:patient})
    }
    else{
        res.json({done:false})
    }
})


router.get('/mon-dossier', async(req, res)=>{
    var locals = {
        title:'Mon-dossier'
    }
    if(req.session.login){
        var diags = await Diagnostic.find({patient:req.session._id})
        res.render('mon-dossier', {
            locals,
            diags,
            login: true, 
            qrcode:req.session.qrcode,
            page:"compte", 
            _id:req.session._id,
            email:req.session.email,
            fullname:req.session.fullname ? req.session.fullname : false
        })
    }
    else{
        res.redirect('/')
    }
})











module.exports = router;