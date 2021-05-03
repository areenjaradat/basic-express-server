'use strict';

const express=require('express');

const errorHandler=require('./handlers/500');
const notFoundHandler=require('./handlers/404');

const logger=require('./middleware/logger');
const validator = require('./middleware/validator');

const app=express();

//Global middleware

app.use(logger);
app.use(express.json());

//add routes 
app.get('/',(request,response)=>{
  console.log('i am work');
  response.status(200).send('i am work');
});
app.get('/person',validator,(req,res)=>{
  console.log(req.query.name);
  res.status(200).json({
    name: req.query.name,
  });
});
app.get('/badRequet',(req,res)=>{
  throw new Error('manual error');
});

//handler Middlewares
app.use('*',notFoundHandler);
app.use(errorHandler);

function start(PORT){
  app.listen(PORT,()=>{
    console.log(`App is Runnning on ${PORT}`);
  });
}

module.exports={
  app:app,
  start:start,
};