const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment]
const database = require('knex')(configuration);

const server = express();

server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());
server.use('/', express.static('public'));

server.get('api/v1/photos', (request, response) => {
  database('photos')
    .select()
    .then(photos => response.status(200).json(photos))
    .catch(error => response.status(500).json({ error }))
});

server.listen(server.get('port'), () => {
  console.log(`Server running on port ${server.get('port')}`);
});