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
    movie_id BIGINT REFERENCES movies(id),
    PRIMARY KEY (actor_id, movie_id) 
);


--Testing data

-- INSERT INTO movies (title) VALUES ('Thor 3');
-- INSERT INTO movies (title) VALUES ('Avengers');
-- INSERT INTO movies (title) VALUES ('Captain America');
-- INSERT INTO movies (title) VALUES ('Iron Man');

-- INSERT INTO actors (first_name, last_name) VALUES ('Chris', 'Hemsworth');
-- INSERT INTO actors (first_name, last_name) VALUES ('Robert', 'Downey');
-- INSERT INTO actors (first_name, last_name) VALUES ('Scarlett', 'Johansson');
-- INSERT INTO actors (first_name, last_name) VALUES ('Chris', 'Evans');



-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (1, 1);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (1, 2);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (1, 3);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (2, 2);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (2, 4);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (3, 2);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (4, 2);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (4, 3);
-- INSERT INTO actors_movies (actor_id, movie_id) VALUES (4, 4);

