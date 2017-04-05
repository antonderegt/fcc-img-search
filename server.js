'use strict';

const express = require("express")
const mongo = require("mongodb")
const path = require('path')
const api = require("./api.js")

require('dotenv').config({
  silent: true
});

const app = express()

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

mongo.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/images', (err, db) => {

  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }
  
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, './index.html'))
  })
  
  api(app, db)
  
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server listening...')
})

// app.set('port', (process.env.PORT || 8080))
// const server = app.listen(app.get('port'), () => {
//   console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
// })