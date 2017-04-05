'use strict';

const express = require("express")
const mongo = require("mongodb")
const path = require('path')
const api = require("./api.js")

require('dotenv').config({
  silent: true
});

const app = express()

mongo.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/images', (err, db) => {

  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, './index.html'))
  })
  
  api(app, db)
  
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server listening...')
})