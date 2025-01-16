const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Post' });
});

module.exports = router;