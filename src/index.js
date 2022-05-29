//import path
const path = require('path');
//import express
const express = require('express');
const { check } = require('express-validator');
// import morgan
const morgan = require('morgan');
//import db
const db =require('./config/db');
//require multer
// import handlebars
const { engine } = require('express-handlebars');
//import app compiler
const app = express();
const route = require('./routes');
db.connect();
// define port
const port = 3000;
//Http logger
app.use(morgan('combined'));
//configure img path
app.use(express.static(path.join(__dirname, 'public')));
//middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(check());
app.use(express.json());
//template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers:{
      Sum:(a,b)=>a+b,
    }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//using router
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
