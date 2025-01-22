const bcrypt = require('bcrypt');
const db = require('../models/user');

const saltRounds = 10;

// Function to validate password security requirements
function isValidPassword(password) {
  const minLength = 8;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  return password.length >= minLength && regex.test(password);
}

// Registration logic
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!isValidPassword(password)) {
    return res.render('register', {
      message: 'Password must be at least 8 characters long, with at least one uppercase letter, one number, and one special character.'
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
      if (err) {
        return res.render('register', { message: 'User already exists!' });
      }
      res.render('login', { message: 'Registration successful!' });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).render('register', { message: 'An internal error occurred. Please try again.' });
  }
};

// Login logic
exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.render('login', { message: 'Something went wrong!' });
    }

    if (!user) {
      return res.render('login', { message: 'Username does not exist' });
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.userId = user.id; // Store user ID in session
        res.redirect('/'); // Redirect to home (or desired page) after success
      } else {
        res.render('login', { message: 'Incorrect password' });
      }
    } catch (compareError) {
      console.error('Error comparing passwords:', compareError);
      res.render('login', { message: 'An error occurred. Please try again.' });
    }
  });
};
