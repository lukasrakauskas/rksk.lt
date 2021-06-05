import { Deta } from 'deta';

const deta = Deta(process.env.DETA_ACCESS_KEY);
const db = deta.Base('messages');

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(500).json({});
  if (!req.body.name || !req.body.email || !req.body.message)
    return res.status(500).json({});

  try {
    const { name, email, message } = req.body;
    const created_at = new Date();
    const toCreate = { name, email, message, created_at };
    const insertedMessage = await db.put(toCreate);
    return res.status(201).json(insertedMessage);
  } catch (error) {
    return res.status(500).json({});
  }
};
