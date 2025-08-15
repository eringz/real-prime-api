import { pool } from '../config/db.js';

class DbTestController {
    async testConnection (req, res) {
        try {
            const result = await pool.query('SELECT NOW()');

            res.json({
                success: true,
                time: result.rows[0].now
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }
}

export default new DbTestController;