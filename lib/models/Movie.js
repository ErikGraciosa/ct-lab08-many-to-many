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
        //actors and title are getting thru. Trying to get actor id's from the 
        // console.log(actors, title)
        const { rows } = await pool.query(
            'INSERT INTO movies (title) VALUES ($1) RETURNING *',
            [title]
        );

            //This is broken trying to build the junction table, this isn't going to work because new ids are going to be made on the inserts, need to query the table and get the actor.id

        // await Promise.all(actors.map(actor => Actor.insert(actor))
        //     .then(pool.query(
        //         'INSERT INTO actors_movies (actor_id, movie_id) VALUES ($1, $2)'
        //         ,
        //         [actor.id, rows[0].id]
        //         )
        //     )
        // );

        return new Movie(rows[0]);
    }
}