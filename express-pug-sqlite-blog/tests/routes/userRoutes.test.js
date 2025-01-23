const request = require('supertest');
const express = require('express');
const userRoutes = require('../../routes/userRoutes');

jest.mock('../../controllers/userController', () => ({
  login: jest.fn((req, res) => {
    if (req.body.username && req.body.password) {
      res.status(200).send('Logged in');
    } else {
      res.status(400).send('Invalid input');
    }
  }),
  register: jest.fn((req, res) => {
    if (req.body.username && req.body.password) {
      res.status(201).send('User registered');
    } else {
      res.status(400).send('Invalid input');
    }
  }),
}));

describe('User Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.set('views', './views'); 
    app.set('view engine', 'pug'); 
    app.use('/api/user', userRoutes);
  });

  test('GET /api/user/login should render the login page', async () => {
    const response = await request(app).get('/api/user/login');
    expect(response.status).toBe(200);
  });

  test('GET /api/user/register should render the register page', async () => {
    const response = await request(app).get('/api/user/register');
    expect(response.status).toBe(200);
  });

  test('POST /api/user/login with valid data should return 200', async () => {
    const response = await request(app).post('/api/user/login').send({
      username: 'testuser',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Logged in');
  });

  test('POST /api/user/login with invalid data should return 400', async () => {
    const response = await request(app).post('/api/user/login').send({});
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid input');
  });

  test('POST /api/user/register with valid data should return 201', async () => {
    const response = await request(app).post('/api/user/register').send({
      username: 'newuser',
      password: 'password123',
    });
    expect(response.status).toBe(201);
    expect(response.text).toBe('User registered');
  });

  test('POST /api/user/register with invalid data should return 400', async () => {
    const response = await request(app).post('/api/user/register').send({});
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid input');
  });
});
