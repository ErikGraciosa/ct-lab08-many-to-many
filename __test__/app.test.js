const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/models/Actor');
const Movie = require('../lib/models/Movie');

describe('movies routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

//   afterAll(() => {
//     return pool.end();
//   });

  it('create a new movie via POST', async() => {
    const response = await request(app)
        .post('/api/v1/movies')
        .send({
            title: 'The Big Lebowski'
        });

    expect(response.body).toEqual({
      id: '1',
      title: 'The Big Lebowski'
    });
  });

  
  //get 

  //get by id

  //put

  //delete

});


describe('actors routes', () => {
    beforeEach(() => {
      return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
    });
  
    afterAll(() => {
      return pool.end();
    });
  
    it('create a new actor via POST', async() => {
      const response = await request(app)
        .post('/api/v1/actors')
        .send({
          first_name: 'Jeff',
          last_name: 'Bridges'
        });
  
      expect(response.body).toEqual({
        id: '1',
        first_name: 'Jeff',
        last_name: 'Bridges'
      });
    });
  
    //get 
  
    //get by id
  
    //put
  
    //delete
  
  
  
  
});
