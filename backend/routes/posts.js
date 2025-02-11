import express from 'express';

const router = express.Router();
const posts = [];

router.get('/api/posts', (req, res) => {
  res.json(posts);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    posts.push({ title, content });
    res.status(201).json({ message: 'Post created successfully' });
  } else {
    res.status(400).json({ error: 'Both title and content are required' });
  }
});

export default router;
