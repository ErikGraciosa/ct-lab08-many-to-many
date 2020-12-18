const pool = require('../utils/pool');
const Actor = require('./Actor')

module.exports = class Movie {
    id;
    title;

    constructor(row) {
        this.id = String(row.id);
        this.title = row.title;
    }

    static async insert({ title, actors = [] }) {
        //This successfully puts movies into movies table        
        const { rows } = await pool.query(
            'INSERT INTO movies (title) VALUES ($1) RETURNING *',
            [title]
        );

        await pool.query(
            `INSERT INTO actors_movies (movie_id, actor_id)
            SELECT ${rows[0].id}, id FROM actors WHERE name = ANY($1::text[])`,
            [actors]
          );

        return new Movie(rows[0]);
    }

    static async getById(id) {
        
        const { rows } = await pool.query(
            `SELECT
                movies.*,
                array_agg(actors.name) AS actors
            FROM
                actors_movies
            JOIN movies
            ON actors_movies.movie_id = movies.id
            JOIN actors
            ON actors_movies.actor_id = actors.id
            WHERE movies.id=$1
            GROUP BY movies.id`,
            [id]
        );
        
        if(!rows[0]) throw new Error(`No movie found for id ${id}`);

        return {
            ...new Movie(rows[0]),
            actors: rows[0].actors
          };
    }

    static async getAll() {
        console.log('in the method')
        const { rows } = await pool.query(
            'SELECT * FROM movies'
        );
        console.log(rows)
        return rows.map(row => new Movie(row));
    }

}
