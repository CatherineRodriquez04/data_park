import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, age, preferences, virtual_currency_balance } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: 'Name and age are required' });
    }

    try {
      const result = await query(
        'INSERT INTO Visitors (name, age, preferences, virtual_currency_balance) VALUES (?, ?, ?, ?)',
        [name, age, preferences || null, virtual_currency_balance || 0]
      );
      return res.status(201).json({ message: 'Visitor added successfully', result });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error', error });
    }
  } else if (req.method === 'DELETE') {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: 'Name and age are required' });
    }

    try {
      const result = await query('DELETE FROM Visitors WHERE name = ? AND age = ?', [name, age]);
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Visitor deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Visitor not found' });
      }
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error', error });
    }
  } else if (req.method === 'GET') {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: 'Name is required to look up a visitor' });
    }

    try {
      const result = await query(
        'SELECT name, age, preferences, virtual_currency_balance FROM Visitors WHERE name = ?',
        [name]
      );
      console.log('Database query result:', result); // Debugging log
      if (result.length > 0) {
        return res.status(200).json({ visitor: result[0] });
      } else {
        return res.status(404).json({ message: 'Visitor not found' });
      }
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error', error });
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
