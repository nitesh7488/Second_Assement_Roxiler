const pool = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, address, password, role = 'user' }) {

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, hashedPassword, address, role || 'user']
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async findByEmail(email, includePassword = false) {

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      if (!includePassword) {
        delete user.password; // Remove password from the returned user object
      }
      return user;

    } catch (error) {
      throw new Error('Error finding user by email: ' + error.message);
    }
  }

  static async findAll(filters = {}, sort = { field: 'name', order: 'ASC' }) {
    try {
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
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  static async updatePassword(id, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
    } catch (error) {
      throw new Error('Error updating password: ' + error.message);
    }
  }

  static async count() {
    try {
      const result = await pool.query('SELECT COUNT(*) FROM users');
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error('Error counting users: ' + error.message);
    }
  }
}

module.exports = User;
