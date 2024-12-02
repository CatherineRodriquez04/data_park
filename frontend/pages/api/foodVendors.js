import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
        const result = await query(`
            SELECT menu_items, COUNT(*) AS frequency
            FROM FoodVendors
            GROUP BY menu_items
            ORDER BY frequency DESC
            LIMIT 1;
        `);
        if (result.length > 0) {
            return res.status(200).json({ menuItem: result[0] });
        } else {
            return res.status(404).json({ message: 'No menu items found' });
        }
        } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Database error', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
