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
    
    await Promise.all([
        {
            first_name: 'Chris',
            last_name: 'Hemsworth'
        },
        {
            first_name: 'Robert',
            last_name: 'Downey'
        },
        {
            first_name: 'Scarlett',
            last_name: 'Johansson'
        }   
    ].map(actor => Actor.insert(actor)));
    
    const response = await request(app)
        .post('/api/v1/movies')
        .send({
            title: 'Avengers',
            actors: [
                {
                    first_name: 'Chris',
                    last_name: 'Hemsworth'
                },
                {
                    first_name: 'Robert',
                    last_name: 'Downey'
                },
                {
                    first_name: 'Scarlett',
                    last_name: 'Johansson'
                }   
            ]
        });

    expect(response.body).toEqual({
      id: '1',
      title: 'Avengers'
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
            first_name: 'Chris',
            last_name: 'Hemsworth'
        });
  
      expect(response.body).toEqual({
        id: '1',
        first_name: 'Chris',
        last_name: 'Hemsworth'
      });
    });
  
    //get 
  
    //get by id
  
    //put
  
    //delete
  
  
  
  
});
