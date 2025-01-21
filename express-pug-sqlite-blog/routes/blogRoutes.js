const express = require('express');
const router = express.Router();
const { 
  getBlogPosts, 
  createBlogPost, 
  getBlogPostById, 
  updateBlogPost, 
  deleteBlogPost, 
  getBlogPostStats 
} = require('../controllers/blogController');

router.get('/', getBlogPosts);
router.get('/create', createBlogPost.get); 
router.post('/create', createBlogPost.post);
router.get('/post/:id', getBlogPostById);
router.get('/edit/:id', updateBlogPost.get); 
router.post('/edit/:id', updateBlogPost.post);
router.post('/delete/:id', deleteBlogPost);
router.get('/stats', getBlogPostStats);

module.exports = router;