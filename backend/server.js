import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const app = express();

const posts = []; // In-memory storage

// Enable JSON request body parsing
app.use(express.json());

// Use Helmet for security
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors());

// API Endpoints
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = { title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Serve frontend files (after defining API routes)
app.use(express.static('frontend'));

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3001;

// Store the server reference for graceful shutdown in tests
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
