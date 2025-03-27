import { connectToDatabase } from '../../lib/mongoose';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { identifier, password } = req.body;

  await connectToDatabase();

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
    },
  });
}
