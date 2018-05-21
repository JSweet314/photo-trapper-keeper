const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment]
const database = require('knex')(configuration);

const server = express();

server.locals.title = 'Photo Trapper Keeper';
server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());
server.use('/', express.static('public'));

server.get('/api/v1/photos', (request, response) => {
  database('photos')
    .select()
    .then(photos => response.status(200).json(photos))
    .catch(error => response.status(500).json({ error }))
});

server.post('/api/v1/photos', (request, response) => {
  const photo = request.body;
  for (let requiredParameter of ['title', 'url']) {
    if (!photo[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: { title: <String>, url: <String> }. Missing required ${requiredParameter}.`
      });
    }
  }
  return database('photos')
    .insert(photo, 'id')
    .then(result => response.status(201).json({ id: result[0] }))
    .catch(error => response.status(500).json({ error }));
});

server.delete('/api/v1/photos/:id', (request, response) => {
  const { id } = request.params;
  database('photos')
    .where('id', id)
    .del()
    .then(delCount => {
      if (delCount === 0) {
        return response.status(422).json({
          error: `${delCount} photo(s) deleted. No photo found with id=${id}.`
        })
      }
      return response.status(200).json({
        message: `${delCount} photo(s) deleted with id=${id}.`
      })
    })
    .catch(error => response.status(500).json({ error }))
});

server.listen(server.get('port'), () => {
  console.log(`${server.locals.title} running on port ${server.get('port')}`);
});

module.exports = { server, database };