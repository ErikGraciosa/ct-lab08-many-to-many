const pool = require('../utils/pool');

module.exports = class Actor {
    id;
    first_name;
    last_name;

    constructor(row) {
        this.id = String(row.id);
        this.first_name = row.first_name;
        this.last_name = row.last_name;
    }

    static async insert({ first_name, last_name }) {
        const { rows } = await pool.query(
            'INSERT INTO actors (first_name, last_name) VALUES ($1, $2) RETURNING *',
            [first_name, last_name]
        );
        
        return new Actor(rows[0]);
    }
}