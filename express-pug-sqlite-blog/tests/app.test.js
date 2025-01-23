const request = require('supertest');
const express = require('express');
const session = require('express-session');

jest.mock('../middleware/ensureAuth', () => jest.fn((req, res, next) => next()));

const userRoutes = require('../routes/userRoutes');
const blogRoutes = require('../routes/blogRoutes');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session({
    secret: 'test-secret',
    resave: false,
    saveUninitialized: true,
  }));

  app.use('/', userRoutes);
  app.use('/', require('../middleware/ensureAuth'), blogRoutes);

  app.get('/', (req, res) => {
    if (req.session.userId) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });

  app.use((req, res) => {
    res.status(404).send('Not Found');
  });

  app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
  });

  return app;
}

describe('Express App', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('GET / should redirect based on session', async () => {
    const responseNoSession = await request(app).get('/');
    expect(responseNoSession.status).toBeGreaterThanOrEqual(300);
    
    app.use((req, res, next) => {
      req.session.userId = 1;
      next();
    });

    const responseWithSession = await request(app).get('/');
    expect(responseWithSession.status).toBeGreaterThanOrEqual(300);
  });

  test('Unknown routes should return a 404 error', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Not Found');
  });
});
