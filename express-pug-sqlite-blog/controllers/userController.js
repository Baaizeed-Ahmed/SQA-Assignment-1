// controllers/userController.js
const bcrypt = require('bcrypt');
const db = require('../models/user');

const saltRounds = 10;

exports.register = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) throw err;
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
      if (err) {
        return res.render('register', { message: 'User already exists!' });
      }
      res.render('login', { message: 'Registration successful!' });
    });
  });
};

// Example login action in your userController.js
exports.login = (req, res) => {
    const { username, password } = req.body;
  
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
      if (err) {
        return res.render('login', { message: 'Something went wrong!' });
      }
      if (!user) {
        return res.render('login', { message: 'Username does not exist' });
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          req.session.userId = user.id; // Set session userId
          res.redirect('/home'); // Redirect to home after successful login
        } else {
          res.render('login', { message: 'Incorrect password' });
        }
      });
    });
  };
  