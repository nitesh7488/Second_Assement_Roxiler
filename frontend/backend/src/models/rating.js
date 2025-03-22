const pool = require('../db');

class Rating {
  static async createOrUpdate({ user_id, store_id, rating }) {
    const result = await pool.query(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) ON CONFLICT (user_id, store_id) DO UPDATE SET rating = $3 RETURNING *',
      [user_id, store_id, rating]
    );
    return result.rows[0];
  }

  static async findByStore(store_id) {
    const result = await pool.query(
      'SELECT r.*, u.name FROM ratings r JOIN users u ON r.user_id = u.id WHERE store_id = $1',
      [store_id]
    );
    return result.rows;
  }

  static async findByUserAndStore(user_id, store_id) {
    const result = await pool.query(
      'SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2',
      [user_id, store_id]
    );
    return result.rows[0];
  }

  static async count() {
    const result = await pool.query('SELECT COUNT(*) FROM ratings');
    return parseInt(result.rows[0].count);
  }

  static async averageRating(store_id) {
    const result = await pool.query(
      'SELECT AVG(rating) FROM ratings WHERE store_id = $1',
      [store_id]
    );
    return parseFloat(result.rows[0].avg) || 0;
  }
}

module.exports = Rating;