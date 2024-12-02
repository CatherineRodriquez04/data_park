import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { wait_time, capacity } = req.query;

    // Validate the query parameters
    if (!wait_time || !capacity) {
      return res.status(400).json({ message: 'Both wait_time and capacity are required' });
    }

    try {
      const result = await query(
        'SELECT name, wait_time, capacity, thrill_level FROM Rides WHERE wait_time <= ? AND capacity > ?',
        [parseInt(wait_time), parseInt(capacity)]
      );

      if (result.length > 0) {
        return res.status(200).json({ rides: result });
      } else {
        return res.status(404).json({ message: 'No rides found matching the criteria' });
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
