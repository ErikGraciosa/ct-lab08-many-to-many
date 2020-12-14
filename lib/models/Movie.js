const pool = require('../utils/pool');

module.exports = class Movie {
    id;
    title;

    constructor(row) {
        this.id = String(row.id);
        this.title = row.title;
    }

    static async insert({ title }) {
        const { rows } = await pool.query(
            'INSERT INTO movies (title) VALUES ($1) RETURNING *',
            [title]
        );
        return new Movie(rows[0]);
    }
}