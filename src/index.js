//import path
const path = require('path')
//import express
const express = require('express')
// import morgan
const morgan = require('morgan')
// import handlebars
const {engine} = require('express-handlebars')
//import app compiler
const app = express()
const route = require('./routes');
// define port 
const port = 3000
//Http logger
app.use(morgan('combined'))
//configure img path
app.use(express.static(path.join(__dirname,'public')));
//middleware
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
//template engine
app.engine('hbs',engine({
  extname:'.hbs'
}))
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname, 'resources\\views'))


//using router
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})