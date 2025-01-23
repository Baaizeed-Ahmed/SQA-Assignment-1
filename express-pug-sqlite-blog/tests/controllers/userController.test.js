const { register, login } = require('../../controllers/userController');
const bcrypt = require('bcrypt');
const db = require('../../models/user');

jest.mock('bcrypt');
jest.mock('../../models/user', () => ({
  run: jest.fn(),
  get: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('registration should fail with weak password', async () => {
      const req = { body: { username: 'testuser', password: 'weak' } };
      const res = mockResponse();

      await register(req, res);

      expect(res.render).toHaveBeenCalledWith('register', {
        message: 'Password must be at least 8 characters long, with at least one uppercase letter, one number, and one special character.'
      });
    });

    test('registration should succeed with valid password', async () => {
      const req = { body: { username: 'testuser', password: 'Valid123!' } };
      const res = mockResponse();
      const hashedPassword = 'hashedPassword';
      
      bcrypt.hash.mockResolvedValue(hashedPassword);
      db.run.mockImplementation((query, values, callback) => callback(null));

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('Valid123!', 10);
      expect(db.run).toHaveBeenCalledWith(expect.any(String), ['testuser', hashedPassword], expect.any(Function));
      expect(res.render).toHaveBeenCalledWith('login', { message: 'Registration successful!' });
    });

    test('registration should return error if user exists', async () => {
      const req = { body: { username: 'testuser', password: 'Valid123!' } };
      const res = mockResponse();
      const hashedPassword = 'hashedPassword';

      bcrypt.hash.mockResolvedValue(hashedPassword);
      db.run.mockImplementation((query, values, callback) => callback(new Error('User already exists!')));

      await register(req, res);

      expect(res.render).toHaveBeenCalledWith('register', { message: 'User already exists!' });
    });
  });

  describe('login', () => {
    test('login should fail if user does not exist', async () => {
      const req = { body: { username: 'nonexistent', password: 'Valid123!' } };
      const res = mockResponse();

      db.get.mockImplementation((query, values, callback) => callback(null, undefined));

      await login(req, res);

      expect(res.render).toHaveBeenCalledWith('login', { message: 'Username does not exist' });
    });

    test('login should fail with incorrect password', async () => {
      const req = { body: { username: 'testuser', password: 'WrongPass' } };
      const res = mockResponse();

      db.get.mockImplementation((query, values, callback) => callback(null, { id: 1, username: 'testuser', password: 'hashedPassword' }));
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith('WrongPass', 'hashedPassword');
      expect(res.render).toHaveBeenCalledWith('login', { message: 'Incorrect password' });
    });

    test('login should succeed with correct password', async () => {
      const req = { body: { username: 'testuser', password: 'Valid123!' } };
      const res = mockResponse();

      db.get.mockImplementation((query, values, callback) => callback(null, { id: 1, username: 'testuser', password: 'hashedPassword' }));
      bcrypt.compare.mockResolvedValue(true);

      const reqSession = {};
      req.session = reqSession;

      await login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith('Valid123!', 'hashedPassword');
      expect(req.session.userId).toBe(1);
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });
});
