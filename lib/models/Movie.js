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

        //Need actors into actors table. 
        //For each actor do a Actor.insert, the return from that insert should have the actor id on it. 
        //With that actor_id, pair up the actor_id, movie_id, put into actors_movies junction.
        
        //Need junction table made for each actor to movie relationship.
        await pool.query(
            `INSERT INTO actors_movies (actor_id, movie_id)
            SELECT ${rows[0].id}, id FROM actors WHERE name = ANY($1::text[])`,
            [actors]
          );

        return new Movie(rows[0]);
    }
}
