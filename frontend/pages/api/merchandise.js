import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { price } = req.query;

        if (!price) {
        return res.status(400).json({ message: 'Price is required' });
        }

        try {
        const results = await query('SELECT name, price FROM Merchandise WHERE price < ?', [price]);
        return res.status(200).json({ merchandise: results });
        } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Database error', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
