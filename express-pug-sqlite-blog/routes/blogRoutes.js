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
const commentController = require('../controllers/commentController')

router.get('/', getBlogPosts);
router.get('/create', createBlogPost.get); 
router.post('/create', createBlogPost.post);
router.get('/post/:id', getBlogPostById);
router.get('/edit/:id', updateBlogPost.get); 
router.post('/edit/:id', updateBlogPost.post);
router.post('/delete/:id', deleteBlogPost);
router.get('/stats', getBlogPostStats);

router.get('/posts/:postId/comments', commentController.getComments);
router.post('/posts/:postId/comments', commentController.addComment);
router.put('/comments/:commentId', commentController.editComment);
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;