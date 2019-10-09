var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');


var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.json({error:err,message:err.message,status:err.status});
});

//Angular View
app.get('/*', (req, res) => {
  let indexFilePath = path.join(__dirname, 'public/index.html');
  if (fs.existsSync(indexFilePath)){
    res.sendFile(indexFilePath);
  }else{
    res.json({message:'Welcome to Angular 8, please move your bundled build to public folder '});
  }
});

module.exports = app;
