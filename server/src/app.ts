import createError from 'http-errors';
import express from 'express';
const app = express();
import apiRouter from './routes';

import path from 'path';
import fs from 'fs';
import logger from 'morgan';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  res.json({error:err.err,message:err.message,status:err.status});
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

export {app};
