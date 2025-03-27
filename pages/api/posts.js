import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const clients = await clientPromise;
  const db = clients.db('posts');
  const message = db.collection('message');

  if (req.method === 'POST') {
    const { title, text, category, user } = req.body;
    if (!title || !text || !category || !user) {
      return res.status(400).json({ message: 'Felder fehlen' });
    }

    await message.insertOne({
      title,
      text,
      category,
      user,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: 'Beitrag gespeichert' });
  }

  if (req.method === 'GET') {
    const category = req.query.category;
    let posts;
    if (category === 'team' || category === 'player') {
      posts = await message.find({ category }).toArray();
    } else {
      posts = await message.find({}).toArray();
    }
    return res.status(200).json(posts);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
