const request = require('supertest');
const express = require('express');
const blogRoutes = require('../../routes/blogRoutes');

jest.mock('../../controllers/blogController', () => ({
  getBlogPosts: jest.fn((req, res) => res.status(200).json([{ id: 1, title: 'Sample Post' }])),
  createBlogPost: {
    get: jest.fn((req, res) => res.status(200).send('Create page')),
    post: jest.fn((req, res) => res.status(201).json({ id: 1, title: 'Test Blog' })),
  },
  getBlogPostById: jest.fn((req, res) => {
    const id = req.params.id;
    res.status(200).json({ id, title: 'Blog Post' });
  }),
  updateBlogPost: {
    get: jest.fn((req, res) => res.status(200).send('Edit page')),
    post: jest.fn((req, res) => {
      const id = req.params.id;
      res.status(200).json({ id, title: 'Updated Blog' });
    }),
  },
  deleteBlogPost: jest.fn((req, res) => res.status(204).send()),
  getBlogPostStats: jest.fn((req, res) => res.status(200).json({ total: 5 })),
}));

jest.mock('../../controllers/commentController', () => ({
  getComments: jest.fn((req, res) => res.status(200).json([{ id: 1, content: 'Sample Comment' }])),
  addComment: jest.fn((req, res) => res.status(201).json({ id: 1, content: 'Test Comment' })),
  editComment: jest.fn((req, res) => res.status(200).json({ id: req.params.commentId, content: 'Updated Comment' })),
  deleteComment: jest.fn((req, res) => res.status(204).send()),
}));

describe('Blog Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json()); 
    app.use('/api/blog', blogRoutes);
  });

  test('GET /api/blog/ should return 200 and a list of blog posts', async () => {
    const response = await request(app).get('/api/blog/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Sample Post' }]);
  });

  test('GET /api/blog/create should return 200 (create page)', async () => {
    const response = await request(app).get('/api/blog/create');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Create page');
  });

  test('POST /api/blog/create should return 201 and the created blog post', async () => {
    const response = await request(app).post('/api/blog/create').send({ title: 'Test Blog' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, title: 'Test Blog' });
  });

  test('GET /api/blog/post/:id should return 200 and the blog post', async () => {
    const response = await request(app).get('/api/blog/post/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', title: 'Blog Post' });
  });

  test('GET /api/blog/edit/:id should return 200 (edit page)', async () => {
    const response = await request(app).get('/api/blog/edit/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Edit page');
  });

  test('POST /api/blog/edit/:id should return 200 and the updated blog post', async () => {
    const response = await request(app).post('/api/blog/edit/1').send({ title: 'Updated Blog' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', title: 'Updated Blog' });
  });

  test('POST /api/blog/delete/:id should return 204', async () => {
    const response = await request(app).post('/api/blog/delete/1');
    expect(response.status).toBe(204);
  });

  test('GET /api/blog/stats should return 200 and the blog post stats', async () => {
    const response = await request(app).get('/api/blog/stats');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ total: 5 });
  });

  test('GET /api/blog/posts/:postId/comments should return 200 and the comments list', async () => {
    const response = await request(app).get('/api/blog/posts/1/comments');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, content: 'Sample Comment' }]);
  });

  test('POST /api/blog/posts/:postId/comments should return 201 and the created comment', async () => {
    const response = await request(app).post('/api/blog/posts/1/comments').send({ content: 'Test Comment' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, content: 'Test Comment' });
  });

  test('PUT /api/blog/comments/:commentId should return 200 and the updated comment', async () => {
    const response = await request(app).put('/api/blog/comments/1').send({ content: 'Updated Comment' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', content: 'Updated Comment' });
  });

  test('DELETE /api/blog/comments/:commentId should return 204', async () => {
    const response = await request(app).delete('/api/blog/comments/1');
    expect(response.status).toBe(204);
  });
});
