const Comment = require('../models/comment'); // Ensure the path is correct

// Fetch all comments for a specific post
exports.getComments = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.findAll({
            where: { post_id: postId },
            order: [['created_at', 'ASC']], // Ensure comments are ordered by creation time
        });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Add a new comment
exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { user_name, content, parent_id } = req.body;

    try {
        // Debug logs
        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body);

        // Add the comment to the database
        const newComment = await Comment.create({
            post_id: postId,
            parent_id: parent_id || null, // Handle parent_id if it is undefined
            user_name,
            content,
        });

        console.log('Comment successfully added:', newComment);

        // Redirect back to the post page
        res.redirect(`/post/${postId}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Edit an existing comment
exports.editComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await comment.update({ content });
        res.json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error('Error editing comment:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await comment.destroy();
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Internal Server Error');
    }
};
