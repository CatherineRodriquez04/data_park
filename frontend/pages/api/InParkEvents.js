import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    try {
      const results = await query(
        'SELECT name, schedule FROM InParkEvents WHERE location = ?',
        [location]
      );
      if (results.length > 0) {
        return res.status(200).json({ events: results });
      } else {
        return res.status(404).json({ message: 'No events found for the selected location' });
      }
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
