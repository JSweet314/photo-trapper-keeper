const chai = require('chai');
const chaiHttp = require('chai-http');
const { server, database } = require('../server.js');
const { expect } = chai;
chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should serve up public assets by default', done => {
    chai.request(server)
      .get('/')
      .end(((error, response) => {
        expect(response).to.have.status(200);
        done();
      }))
  });
});

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/photos', () => {
    it('should return all of the photos', done => {
      chai.request(server)
        .get('/api/v1/photos')
        .end(((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.json;
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(3);
          expect(response.body[0]).to.have.property(
            'id',
            1
          );
          expect(response.body[0]).to.have.property(
            'title',
            '1 amazing photo!'
          );
          expect(response.body[0]).to.have.property(
            'url',
            'https://i.imgur.com/MA2D0.jpg'
          );
          done();
        }))
    });
  });

  describe('POST /api/v1/photos', () => {
    it('should add a new photo to the database', done => {
      chai.request(server)
        .post('/api/v1/photos')
        .send({ 
          title: 'The Grand Canyon', 
          url: 'https://i.imgur.com/O9H5WlX.jpg' 
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response).to.be.json;
          expect(response.body).to.have.property('id');
          done()
        });
    });

    it('should return an error with status 422 if a required param is missing', done => {
      chai.request(server)
        .post('/api/v1/photos')
        .send({ 
          title: 'A pretty picture' 
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response).to.be.json;
          expect(response.body).to.have.property(
            'error',
            'Expected format: { title: <String>, url: <String> }. Missing required url.'
          );
          done();
        });
    });
  });

  describe('DELETE /api/v1/photos', () => {
    it('should delete a photo by its ID', done => {
      chai.request(server)
        .delete('/api/v1/photos/3')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.json;
          expect(response.body).to.have.property(
            'message',
            '1 photo(s) deleted with id=3.'
          );
          done();
        });
    });

    it('should return an error with status 422 if no photo is found', done => {
      chai.request(server)
        .delete('/api/v1/photos/500')
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response).to.be.json;
          expect(response.body).to.have.property(
            'error',
            '0 photo(s) deleted. No photo found with id=500.'
          );
          done();
        });
    });
  });
});