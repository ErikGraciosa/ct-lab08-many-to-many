DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS actors CASCADE;
DROP TABLE IF EXISTS actors_movies;

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE actors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);



CREATE TABLE actors_movies (
    actor_id BIGINT REFERENCES actors(id),
    movies_id BIGINT REFERENCES movies(id),
    PRIMARY KEY (actor_id, movies_id) 
);

