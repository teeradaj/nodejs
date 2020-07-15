const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes)

app.listen(3000, () => console.log('Start on port 3000!'))
 
module.exports = {
  app
}