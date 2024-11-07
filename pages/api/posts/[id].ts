// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get a specific post by ID
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching post' });
    }
  } else if (req.method === 'PUT') {
    // Update a post by ID
    const { title, content } = req.body;

    try {
      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content, updatedAt: new Date() },
      });
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating post' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a post by ID
    try {
      await prisma.post.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
