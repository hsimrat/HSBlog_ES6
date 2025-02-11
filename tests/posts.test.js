import request from 'supertest';
import { app ,server} from '../backend/server.js'; // Correct import path

describe('Blog API Tests', () => {
  afterAll(() => {
    server.close(); // Ensure the server shuts down after tests
  });

  it('should fetch all posts successfully', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
