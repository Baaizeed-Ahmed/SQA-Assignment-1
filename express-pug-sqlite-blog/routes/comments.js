const express = require('express');
const { BlogPost, Comment } = require('../models');

const router = express.Router();

// Display comments for a blog post
router.get('/:blogPostId', async (req, res) => {
    const { blogPostId } = req.params;
    const post = await BlogPost.findByPk(blogPostId);
    const comments = await Comment.findAll({ where: { blogPostId } });

    // Build comment tree for nested replies
    const buildCommentTree = (comments, parentId = null) => {
        return comments
            .filter(comment => comment.parentId === parentId)
            .map(comment => ({
                ...comment.toJSON(),
                replies: buildCommentTree(comments, comment.id),
            }));
    };

    const commentTree = buildCommentTree(comments);
    res.render('comments', { title: `Comments for ${post.title}`, post, comments: commentTree });
});

// Add a new comment
router.post('/:blogPostId', async (req, res) => {
    const { blogPostId } = req.params;
    const { content, author } = req.body;

    try {
        await Comment.create({ content, author, blogPostId });
        res.redirect(`/comments/${blogPostId}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Failed to add comment.');
    }
});

// Add a reply to a comment
router.post('/:blogPostId/:parentId', async (req, res) => {
    const { blogPostId, parentId } = req.params;
    const { content, author } = req.body;

    try {
        await Comment.create({ content, author, blogPostId, parentId });
        res.redirect(`/comments/${blogPostId}`);
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).send('Failed to add reply.');
    }
});

module.exports = router;
