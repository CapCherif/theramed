const express = require('express');
const fs = require('fs')

const router = express.Router();
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const User = require('../models/User')
const Message = require('../models/Message')


const adminLayout = "../views/layouts/admin"




// router.get('/compte-medecin', async(req, res)=>{
//     if(req.session.loginMedecin){
//         res.render('medecin/compte', {layout:adminLayout})
//     }

//     else{
//         res.redirect('/signup-medecin')
//     }
// })






module.exports = router;