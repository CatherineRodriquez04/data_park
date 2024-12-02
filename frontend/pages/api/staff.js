import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
        const results = await query(
            'SELECT role, ROUND(AVG(pay), 2) AS average_pay FROM Staff GROUP BY role'
        );
        return res.status(200).json({ staff: results });
        } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Database error', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
