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
  
  it('MOVIE: create a new movie via POST', async() => {   
    await Promise.all([	
      {	title: 'Avengers' }  	
    ].map(title => Movie.insert(title)));

    const response = await request(app)
        .put('/api/v1/movies/1')
        .send({
            title: 'The Incredible Hulk'
        });

    expect(response.body).toEqual({
      id: '1',
      title: 'The Incredible Hulk'
    });
  });

  it('MOVIE: create a new movie via POST', async() => {   
    await Promise.all([	
      {	title: 'Avengers' },
      { title: 'Guardians of the Galaxy' }  	
    ].map(title => Movie.insert(title)));

    const response = await request(app)
        .delete('/api/v1/movies/1')
        .send({
            title: 'The Incredible Hulk'
        });

    expect(response.body).toEqual({
      id: '1',
      title: expect.anything()
    });
  });

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

  it('ACTOR: get a single actor by id', async() => {   
    await Actor.insert({ name: 'Chris Hemsworth' });
    
    const response = await request(app)
        .get('/api/v1/actors/1')

    expect(response.body).toEqual({
      id: '1',
      name: 'Chris Hemsworth'
    });
  });

  //get all
  it('ACTOR: get all actors', async() => {   
    await Promise.all([	
      {	name: 'Chris Hemsworth' },	
      {	name: 'Robert Downey Jr' },	
      {	name: 'Scarlett Johansson'}   	
    ].map(actor => Actor.insert(actor)));
    
    const response = await request(app)
        .get('/api/v1/actors/')

    expect(response.body).toEqual(expect.arrayContaining([	
      {	
        id: '1',
        name: expect.anything() 
      },	
      {	
        id: '2',
        name: expect.anything() 
      },	
      {	
        id: '3',
        name: expect.anything()
      }   	
    ]));
  });
  //put

  //delete

});



  
    
  
  
  