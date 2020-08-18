//adding 3rd packages
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

var PORT = process.env.PORT || 3006;


//initializing express
const app = express();

let server = app.listen(PORT);

const userRoutes = require('./routes/User');


//iniliazing body-parser
app.use(bodyparser.urlencoded());

//using express static to add css via public folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes to pages
app.use('/', userRoutes);

//404 error page
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});