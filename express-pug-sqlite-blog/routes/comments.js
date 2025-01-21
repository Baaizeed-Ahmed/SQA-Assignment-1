const express = require('express');
const { Comment } = require('../models');

const router = express.Router();

// Add a comment or reply
router.post('/:blogPostId', async (req, res) => {
    const { blogPostId } = req.params;
    const { content, author, parentId } = req.body;

    try {
        const comment = await Comment.create({ content, author, parentId, blogPostId });
        res.json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Failed to add comment.');
    }
});

// Get comments for a blog post
router.get('/:blogPostId', async (req, res) => {
    const { blogPostId } = req.params;

    try {
        const comments = await Comment.findAll({ where: { blogPostId } });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Failed to fetch comments.');
    }
});

// Edit a comment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findByPk(id);
        if (!comment) return res.status(404).send('Comment not found.');

        comment.content = content;
        await comment.save();

        res.json(comment);
    } catch (error) {
        console.error('Error editing comment:', error);
        res.status(500).send('Failed to edit comment.');
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const rowsDeleted = await Comment.destroy({ where: { id } });
        if (!rowsDeleted) return res.status(404).send('Comment not found.');

        res.send('Comment deleted.');
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Failed to delete comment.');
    }
});

module.exports = router;
