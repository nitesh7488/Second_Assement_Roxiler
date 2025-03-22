const pool = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, address, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, address, role || 'user']
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findAll(filters = {}, sort = { field: 'name', order: 'ASC' }) {
    let query = 'SELECT * FROM users';
    const conditions = [];
    const values = [];
    if (filters.name) {
      conditions.push(`name ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.name}%`);
    }
    if (filters.email) {
      conditions.push(`email ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.email}%`);
    }
    if (filters.address) {
      conditions.push(`address ILIKE $${conditions.length + 1}`);
      values.push(`%${filters.address}%`);
    }
    if (filters.role) {
      conditions.push(`role = $${conditions.length + 1}`);
      values.push(filters.role);
    }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ` ORDER BY ${sort.field} ${sort.order}`;
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
  }

  static async count() {
    const result = await pool.query('SELECT COUNT(*) FROM users');
    return parseInt(result.rows[0].count);
  }
}

module.exports = User;