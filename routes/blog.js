const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');

router.post('/create', async (req, res) => {
    await BlogPost.create(req.body);
    res.redirect('/');
});

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

module.exports = router;