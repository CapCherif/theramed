const express = require('express');
const fs = require('fs')

const router = express.Router();
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const User = require('../models/User');
const Medecin = require('../models/Medecin');


const adminLayout = "../views/layouts/admin"




// router.get('', async(req, res)=>{ 
 
//     var locals = {
//         title:"Accueil",
//     }
  
//     res.render('index', {locals, locpage:"main",
//                         login:req.session.login ? req.session.login : false, 
//                         page:"home", 
//                         _id: req.session._id ? req.session._id: false,
//                         fullname:req.session.fullname ? req.session.fullname : false 
//                     })

// })








router.get('/admin', async(req, res)=>{ 
 
    var locals = {
        title:"Admin Page",
    }

    if(!req.session.loginAdmin){
        req.session.loginAdmin = false;
    }
    if(!req.session.loginAdmin){
        res.redirect('/admin-login')
    }
  
    else{
        res.render('admin/admin', 
            {layout:adminLayout, loginAdmin:true})

    }
    
})








router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/')
})




router.get('/admin-login', async(req, res)=>{ 
 
    var locals = {
        title:"Login Page",
    }

    if(!req.session.loginAdmin){
        req.session.loginAdmin = false;
    }
    if(req.session.loginAdmin){
        res.redirect('/admin')
    }
    else{
        res.render('admin/admin-login', {layout:adminLayout, loginAdmin:false})
    }
    

})

router.post('/admin-login', async(req, res)=>{
    const {username, password} = req.body
    
    if(process.env.ADMIN_PASSWORD == password && username == process.env.ADMIN_USERNAME){
        req.session.loginAdmin = true;
        res.json({login:true})
    }
    else{
        res.json({err:true})
    }
})



router.get('/patients', async(req, res)=>{
    var patients = await User.find().sort({ createdAt: -1 }).limit(50);
    var medecins = await Medecin.find({confirme:1}).sort({ createdAt: -1 });
    if(req.session.loginAdmin){
        res.render('admin/patients', {loginAdmin:true, patients, medecins, layout:adminLayout})
    }
    else{
        res.redirect('/admin')
    }
})

const QRCode = require('qrcode');
const path = require('path')

router.post('/accept-user', async(req, res)=>{

    var filename = "imgs/"+Date.now()+'_qrcode.png'
    const directory = path.join(__dirname, '../../public/');

    await QRCode.toFile(path.join(directory, filename), req.body.id, {
        color: {
          dark: '#000',  // Couleur des pixels
          light: '#FFF'  // Couleur du fond
        }
    });
    await User.updateOne({ _id: req.body.id }, { confirme: 1, traitant:req.body.traitant, qrcode:filename });

    res.json({done:true})
})


router.post('/decline-user', async(req, res)=>{
    await User.findOneAndDelete({_id: req.body.id})
    res.json({done:true})
})


router.get('/patient/detail', async(req, res)=>{
    var id = req.query.id;

    var user = await User.findOne({_id:id})
    var medecin = await Medecin.findOne({_id:user.traitant}) 

    console.log(user)
    if(req.session.loginAdmin){
        res.render('admin/detail', {loginAdmin:true, loginMedecin:false, user, layout:adminLayout, traitant:medecin? medecin : ""})
    }
    else{
        res.redirect('/admin')
    }
})





router.post('/accept-medecin', async(req, res)=>{
    await Medecin.updateOne({ _id: req.body.id }, { confirme: 1, traitant:req.body.traitant });
    res.json({done:true})
})


router.post('/decline-medecin', async(req, res)=>{
    await Medecin.findOneAndDelete({_id: req.body.id})
    res.json({done:true})
})


router.get('/medecins', async(req, res)=>{
    var medecins = await Medecin.find().sort({ createdAt: -1 }).limit(50);
    if(req.session.loginAdmin){
        res.render('admin/medecin', {loginAdmin:true, medecins, layout:adminLayout})
    }
    else{
        res.redirect('/admin')
    }
})




router.get('/medecin/detail', async(req, res)=>{
    var id = req.query.id;

    var user = await Medecin.findOne({_id:id})
    console.log(user)
    if(req.session.loginAdmin){
        res.render('admin/detail-medecin', {loginAdmin:true, loginMedecin:false, user, layout:adminLayout})
    }
    else{
        res.redirect('/admin')
    }
})























module.exports = router;