const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());
server.use('/', express.static('public'));

server.listen(server.get('port'), () => {
  console.log(`Server running on port ${server.get('port')}`);
});