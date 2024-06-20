require('dotenv').config();

const express = require('express');
const app = express();

// const fs = require('fs');
// const path = require('path');



const expressLayout = require('express-ejs-layouts');
// const cookieParser = require('cookie-parser');

// const MongoStore = require('connect-mongo');

const session = require('express-session');
// const methodOverride = require('method-override');
app.use(expressLayout);

// const connectDB = require('./server/config/db');



// connect to db
// connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(methodOverride('_method'))
app.set('layout', "./layouts/main");
app.set('view engine', "ejs");
app.use(express.static('public'));
// app.use(cookieParser());

// const MongoStore = require('connect-mongo');



const connectDB = require('./server/config/db');







// connect to db
connectDB(); 


// Configuration de la session
// const sessionConfig = {
//   secret: 'azerty123',        // Clé secrète pour signer la session
//   resave: false,
//   saveUninitialized: false,
//   store: new RedisStore({ client: redisClient }),
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // Durée de vie de la session en millisecondes (1 jour)
//   },
// };

// Créez l'application Express
// const app = express();
// const MongoDBStore = require('connect-mongodb-session')(session);

// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: 'sessions',
// });



app.use(session({
  secret: 'test123',
  resave: false,
  saveUninitialized: true,
//   store: store,
}));




const PORT = 5000 || process.env.PORT;

app.use((req, res, next)=>{
  if (typeof req.session.login === 'undefined') {
      req.session.login = false;
  }
  
  next();
})




app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
app.use('/', require('./server/routes/medecin'));












app.listen(PORT, ()=>{
    console.log(`App listening to port ${PORT}`);
})



