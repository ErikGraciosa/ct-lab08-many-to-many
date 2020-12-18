const pool = require('../utils/pool');

module.exports = class Actor {
    id;
    name;

    constructor(row) {
        this.id = String(row.id);
        this.name = row.name;
        
    }

    static async insert({ name }) {
        const { rows } = await pool.query(
            'INSERT INTO actors (name) VALUES ($1) RETURNING *',
            [name]
        );
        
        return new Actor(rows[0]);
    }

    static async getById(id) {
        console.log('in the method of get 1   ' + id)
        const { rows } = await pool.query(
            'SELECT * FROM actors WHERE id=$1',
            [id]
        );
        return new Actor(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM actors'
        );
        return rows.map(row => new Actor(row));
    }

    static async update({ name }, id) {
        const { rows } = await pool.query(
            'UPDATE actors SET name=$1 WHERE id=$2 RETURNING *',
            [name, id]
        );
        return new Actor(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM actors WHERE id=$1 RETURNING *',
            [id]
        );
        return new Actor(rows[0]);
    }

}
