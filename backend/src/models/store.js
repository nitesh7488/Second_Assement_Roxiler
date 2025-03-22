const pool = require('../db');

class Store {
  static async create({ name, email, address, owner_id }) {
    const result = await pool.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, owner_id]
    );
    return result.rows[0];
  }

  static async findAll(filters = {}, sort = { field: 'name', order: 'ASC' }) {
    let query = 'SELECT s.*, AVG(r.rating) as rating FROM stores s LEFT JOIN ratings r ON s.id = r.store_id';
    const conditions = [];
    const values = [];
    if (filters.name) {
      conditions.push(`s.name ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.name}%`);
    }
    if (filters.address) {
      conditions.push(`s.address ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.address}%`);
    }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ` GROUP BY s.id ORDER BY ${sort.field} ${sort.order}`;
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async count() {
    const result = await pool.query('SELECT COUNT(*) FROM stores');
    return parseInt(result.rows[0].count);
  }

  static async findByOwner(owner_id) {
    const result = await pool.query('SELECT * FROM stores WHERE owner_id = $1', [owner_id]);
    return result.rows[0];
  }
}

module.exports = Store;