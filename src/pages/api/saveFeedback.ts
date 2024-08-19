import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await db.connect();

    try {
        if (req.method === 'POST') {
            const { name, contact, responsiblePerson, feedback } = req.body;

            // Save the feedback to the database
            await client.query(
                'INSERT INTO feedback (name, contact, responsible_person, feedback) VALUES ($1, $2, $3, $4)',
                [name, contact, responsiblePerson, feedback]
            );

            return res.status(200).json({ success: true });
        } else if (req.method === 'GET') {
            // Retrieve all feedback from the database
            const result = await client.query('SELECT * FROM feedback');
            const feedbacks = result.rows;

            return res.status(200).json(feedbacks);
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}
