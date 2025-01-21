const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');
const Sequelize = require('sequelize'); 

router.get('/', async (req, res) => {
  const { search, sortBy } = req.query;

  let where = {};
  if (search) {
    where = {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: `%${search}%` } }, 
        { content: { [Sequelize.Op.like]: `%${search}%` } } 
      ]
    };
  }

  let order = [['createdAt', 'DESC']]; // Default: Sort by newest first
  if (sortBy === 'oldest') {
    order = [['createdAt', 'ASC']];
  } else if (sortBy === 'alphabetical') {
    order = [['title', 'ASC']];
  }

  try {
    const posts = await BlogPost.findAll({ where, order });
    res.render('index', { title: 'Blog Posts', posts, search, sortBy }); 
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('An error occurred while fetching posts.'); 
  }
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create Post' });
});

router.post('/create', async (req, res) => {
  try {
    await BlogPost.create(req.body);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('An error occurred while creating the post.');
    console.error('Error creating post:', error);
    res.status(500).send('An error occurred while creating the post.');
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post) {
      res.render('post', { title: post.title, post });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('An error occurred while fetching the post.');
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post) {
      res.render('post', { title: post.title, post });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('An error occurred while fetching the post.');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post) {
      res.render('edit', { title: 'Edit Post', post });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('An error occurred while fetching the post.');
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post) {
      res.render('edit', { title: 'Edit Post', post });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('An error occurred while fetching the post.');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post) {
      await post.update(req.body);
      res.redirect(`/post/${post.id}`);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('An error occurred while updating the post.');
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post) {
      await post.update(req.body);
      res.redirect(`/post/${post.id}`);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('An error occurred while updating the post.');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.redirect('/');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('An error occurred while deleting the post.');
  }
});

module.exports = router;