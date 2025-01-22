const { getBlogPosts, createBlogPost, getBlogPostById, updateBlogPost, deleteBlogPost, getBlogPostStats } = require('../../controllers/blogController');
const BlogPost = require('../models/index');
const Comment = require('../models/comment');

jest.mock('../models/index');
jest.mock('../models/comment');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
};

describe('BlogController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetch all blog posts', async () => {
        BlogPost.findAll.mockResolvedValue([{ id: 1, title: 'Test Post' }]);

        const req = { query: {} };
        const res = mockResponse();

        await getBlogPosts(req, res);

        expect(BlogPost.findAll).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith('index', { title: 'Blog Posts', posts: [{ id: 1, title: 'Test Post' }], search: undefined, sortBy: undefined });
    });

    test('create a new blog post', async () => {
        const req = { body: { title: 'New Post', content: 'Some content' } };
        const res = mockResponse();

        await createBlogPost.post(req, res);

        expect(BlogPost.create).toHaveBeenCalledWith(req.body);
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    test('fetch a single blog post by ID', async () => {
        BlogPost.findByPk.mockResolvedValue({ id: 1, title: 'Test Post' });
        Comment.findAll.mockResolvedValue([{ id: 1, content: 'Nice post!' }]);

        const req = { params: { id: 1 } };
        const res = mockResponse();

        await getBlogPostById(req, res);

        expect(BlogPost.findByPk).toHaveBeenCalledWith(1);
        expect(Comment.findAll).toHaveBeenCalledWith({ where: { post_id: 1 }, order: [['created_at', 'ASC']] });
        expect(res.render).toHaveBeenCalledWith('post', { title: 'Test Post', post: { id: 1, title: 'Test Post' }, comments: [{ id: 1, content: 'Nice post!' }] });
    });

    test('update a blog post', async () => {
        const post = { id: 1, update: jest.fn() };
        BlogPost.findByPk.mockResolvedValue(post);

        const req = { params: { id: 1 }, body: { title: 'Updated Title' } };
        const res = mockResponse();

        await updateBlogPost.post(req, res);

        expect(BlogPost.findByPk).toHaveBeenCalledWith(1);
        expect(post.update).toHaveBeenCalledWith(req.body);
        expect(res.redirect).toHaveBeenCalledWith(`/post/1`);
    });

    test('delete a blog post', async () => {
        const post = { id: 1, destroy: jest.fn() };
        BlogPost.findByPk.mockResolvedValue(post);

        const req = { params: { id: 1 } };
        const res = mockResponse();

        await deleteBlogPost(req, res);

        expect(BlogPost.findByPk).toHaveBeenCalledWith(1);
        expect(post.destroy).toHaveBeenCalledTimes(1);
        expect(res.redirect).toHaveBeenCalledWith('/');
    });
});

