require('dotenv').config();

const compression = require('compression')

var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')


mongoose.Promise = global.Promise;
mongoose.set('debug', false);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));


let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000
}

var routes = require('./routes/ParentRoutes').router;


const LoggerMiddleware = (req, res, next) =>{
  console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`)    
  next();
}

var server = app.listen(port);

app.use(LoggerMiddleware);

app.use('/', routes);

module.exports = server


