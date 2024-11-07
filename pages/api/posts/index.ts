// pages/api/posts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Create a new post
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-'), // Generate slug from title
          content,
        },
      });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating post' });
    }
  } else if (req.method === 'GET') {
    // Retrieve all posts
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
