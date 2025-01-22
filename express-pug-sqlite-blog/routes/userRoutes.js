const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
