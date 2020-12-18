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

  afterAll(() => {
    return pool.end();
  });

  it('MOVIE: create a new movie via POST', async() => {   
    const response = await request(app)
        .post('/api/v1/movies')
        .send({
            title: 'Avengers'
        });

    expect(response.body).toEqual({
      id: '1',
      title: 'Avengers'
    });
  });

  //get by id
  it('MOVIE: finds a movie by id via GET', async() => {
    await Promise.all([	
      {	name: 'Chris Hemsworth' },	
      {	name: 'Robert Downey Jr' },	
      {	name: 'Scarlett Johansson'}   	
    ].map(actor => Actor.insert(actor)));

    const movie = await Movie.insert({
      title: 'Avengers',
      actors: [	
        'Chris Hemsworth',	
        'Robert Downey Jr',	
        'Scarlett Johansson'   
      ]
    });

    const response = await request(app)
      .get(`/api/v1/movies/1`);
    
    expect(response.body).toEqual({
      ...movie,
      actors: [	
        'Chris Hemsworth',	
        'Robert Downey Jr',	
        'Scarlett Johansson'   
      ]
    });
  });



  //get all
  it('MOVIE: finds all movies byGET', async() => {
    await Promise.all([	
      {	title: 'Avengers' },	
      {	title: 'Thor 2' },	
      {	title: 'Iron Man 3'}   	
    ].map(title => Movie.insert(title)));

    const response = await request(app)
      .get(`/api/v1/movies/`);
    
    expect(response.body).toEqual(expect.arrayContaining([	
      {	
        id: '1',
        title: expect.anything() 
      },	
      {	
        id: '2',
        title: expect.anything() 
      },	
      {	
        id: '3',
        title: expect.anything()
      }   	
    ]));
  });
  //put

  //delete


  //ACTORS TESTS 
  it('ACTOR: create a new actor via POST', async() => {
    const response = await request(app)
      .post('/api/v1/actors')
      .send({
          name: 'Chris Hemsworth'
      });

    expect(response.body).toEqual({
      id: '1',
      name: 'Chris Hemsworth'
    });
  });

  //get 
  
  //get all

  //put

  //delete

});



  
    
  
  
  