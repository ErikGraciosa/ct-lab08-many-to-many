const express = require('express');
const app = express();
const Actor = require('../lib/models/Actor');
const Movie = require('../lib/models/Movie');


app.use(express.json());

//Movie routes
app.post('/api/v1/movies', (req, res, next) => {
    Movie
        .insert(req.body)
        .then(movie => res.send(movie))
        .catch(next);
});
//GetById
app.get('/api/v1/movies/:id', (req, res, next) => {
    Movie
        .getById(req.params.id)
        .then(movie => res.send(movie))
        .catch(next);
});

//Get all
app.get('/api/v1/movies/', (req, res, next) => {
    Movie
        .getAll()
        .then(movie => res.send(movie))
        .catch(next);
});
//Put
app.put('/api/v1/movies/:id', (req, res, next) => {
    Movie
        .update(req.body, req.params.id)
        .then(movie => res.send(movie))
        .catch(next);
});
//Delete
app.delete('/api/v1/movies/:id', (req, res, next) => {
    Movie
        .delete(req.params.id)
        .then(movie => res.send(movie))
        .catch(next);
});



//actor routes
//Post
app.post('/api/v1/actors', (req, res, next) => {
    Actor
        .insert(req.body)
        .then(actor => res.send(actor))
        .catch(next)
});

app.get('/api/v1/actors/:id', (req, res, next) => {
    Actor
        .getById(req.params.id)
        .then(actor => res.send(actor))
        .catch(next);
});
//Get
app.get('/api/v1/actors/', (req, res, next) => {
    Actor
        .getAll()
        .then(actor => res.send(actor))
        .catch(next);
});
//Put
//Delete


module.exports = app;
