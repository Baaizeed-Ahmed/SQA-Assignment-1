const BlogPost = require('../models/index');
const Comment = require('../models/comment');
const { buildSearchQuery, buildSortOrder } = require('../utils/helper');

// Fetch all blog posts
const getBlogPosts = async (req, res) => {
    const { search, sortBy } = req.query;

    const where = buildSearchQuery(search);
    const order = buildSortOrder(sortBy);

    try {
        const posts = await BlogPost.findAll({ where, order });
        res.render('index', { title: 'Blog Posts', posts, search, sortBy });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Render the Create Post page
const createBlogPost = {
    get: (req, res) => {
        res.render('create', { title: 'Create Post' });
    },
    post: async (req, res) => {
        try {
            await BlogPost.create(req.body);
            res.redirect('/');
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};

// Fetch a single blog post and its comments
const getBlogPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await BlogPost.findByPk(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const comments = await Comment.findAll({
            where: { post_id: postId },
            order: [['created_at', 'ASC']],
        });

        res.render('post', { title: post.title, post, comments });
    } catch (error) {
        console.error('Error fetching post or comments:', error);
        res.status(500).send('Internal Server Error');
    }
};


// Render the Edit Post page
const updateBlogPost = {
    get: async (req, res) => {
        const postId = req.params.id;
        try {
            const post = await BlogPost.findByPk(postId);
            if (!post) {
                return res.status(404).send('Post not found');
            }
            res.render('edit', { title: 'Edit Post', post });
        } catch (error) {
            console.error('Error fetching post:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    post: async (req, res) => {
        const postId = req.params.id;
        try {
            const post = await BlogPost.findByPk(postId);
            if (!post) {
                return res.status(404).send('Post not found');
            }
            await post.update(req.body);
            res.redirect(`/post/${postId}`);
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await BlogPost.findByPk(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        await post.destroy();
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Fetch blog statistics
const getBlogPostStats = async (req, res) => {
    try {
        const posts = await BlogPost.findAll();
        const lengths = posts.map(post => post.title.length + post.content.length);

        const stats = {
            average_length: lengths.reduce((a, b) => a + b, 0) / lengths.length,
            median_length: lengths.sort((a, b) => a - b)[Math.floor(lengths.length / 2)],
            max_length: Math.max(...lengths),
            min_length: Math.min(...lengths),
            total_length: lengths.reduce((a, b) => a + b, 0),
        };

        res.render('stats', { title: 'Post Statistics', stats });
    } catch (error) {
        console.error('Error fetching posts for stats:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getBlogPosts,
    createBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
    getBlogPostStats,
};
