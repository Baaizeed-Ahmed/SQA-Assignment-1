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

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) {
      return res.render('login', { message: 'Invalid credentials' });
    }
    bcrypt.compare(password, user.password, (compareErr, isValid) => {
      if (isValid) {
        req.session.userId = user.id;
        req.session.save(() => {
          res.redirect('/');
        });
      } else {
        res.render('login', { message: 'Incorrect password' });
      }
    });
  });
};

  