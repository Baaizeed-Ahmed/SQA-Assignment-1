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

router.get('/post/:id', async (req, res) => {
    const post = await BlogPost.findByPk(req.params.id);
    res.render('post', { title: post.title, post });
});

router.get('/edit/:id', async (req, res) => {
    const post = await BlogPost.findByPk(req.params.id);
    res.render('edit', { title: `Edit ${post.title}`, post });
});

router.post('/edit/:id', async (req, res) => {
    const post = await BlogPost.findByPk(req.params.id);
    await post.update(req.body);
    res.redirect(`/post/${post.id}`);
});

router.post('/delete/:id', async (req, res) => {
    const post = await BlogPost.findByPk(req.params.id);
    await post.destroy();
    res.redirect('/');
});

router.get('/stats', async (req, res) => {
    const posts = await BlogPost.findAll();
    const lengths = posts.map(post => post.content.length);
    const stats = {
        average_length: lengths.reduce((a, b) => a + b, 0) / lengths.length,
        median_length: lengths.sort((a, b) => a - b)[Math.floor(lengths.length / 2)],
        max_length: Math.max(...lengths),
        min_length: Math.min(...lengths),
        total_length: lengths.reduce((a, b) => a + b, 0)
    };
    res.render('stats', { title: 'Post Statistics', ...stats });
});

module.exports = router;