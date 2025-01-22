const { getComments, addComment, editComment, deleteComment } = require('../../controllers/commentController');
const Comment = require('../models/comment');

jest.mock('../models/comment');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
};

describe('CommentController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetch all comments for a blog post', async () => {
        Comment.findAll.mockResolvedValue([{ id: 1, content: 'Nice article!', post_id: 1 }]);

        const req = { params: { postId: 1 } };
        const res = mockResponse();

        await getComments(req, res);

        expect(Comment.findAll).toHaveBeenCalledWith({
            where: { post_id: 1 },
            order: [['created_at', 'ASC']],
        });
        expect(res.json).toHaveBeenCalledWith([{ id: 1, content: 'Nice article!', post_id: 1 }]);
    });

    test('add a comment to a blog post', async () => {
        Comment.create.mockResolvedValue({ id: 1, content: 'Nice article!', post_id: 1 });

        const req = { params: { postId: 1 }, body: { user_name: 'John', content: 'Nice article!', parent_id: null } };
        const res = mockResponse();

        await addComment(req, res);

        expect(Comment.create).toHaveBeenCalledWith({
            post_id: 1,
            user_name: 'John',
            content: 'Nice article!',
            parent_id: null,
        });
        expect(res.redirect).toHaveBeenCalledWith('/post/1');
    });

    test('delete a comment', async () => {
        const comment = { id: 1, destroy: jest.fn() };
        Comment.findByPk.mockResolvedValue(comment);

        const req = { params: { commentId: 1 } };
        const res = mockResponse();

        await deleteComment(req, res);

        expect(Comment.findByPk).toHaveBeenCalledWith(1);
        expect(comment.destroy).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ message: 'Comment deleted successfully' });
    });
});
