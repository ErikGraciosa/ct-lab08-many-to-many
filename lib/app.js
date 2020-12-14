const express = require('express');
const app = express();
const Actor = require('../lib/models/Actor');
const Movie = require('../lib/models/Movie');


app.use(express.json());

//Actor routes
app.post('/api/v1/movies', (req, res, next) => {
    Movie
        .insert(req.body)
        .then(movie => res.send(movie))
        .catch(next)
});


//Post
//Get
//Put
//Delete




//actor routes
//Post
app.post('/api/v1/actors', (req, res, next) => {
    Actor
        .insert(req.body)
        .then(movie => res.send(movie))
        .catch(next)
});
//Get
//Put
//Delete


module.exports = app;