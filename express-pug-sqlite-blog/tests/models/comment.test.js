const { Sequelize, DataTypes } = require('sequelize');
const CommentModel = require('../../models/comment');

describe('Comment Model', () => {
  let sequelize;
  let Comment;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
  });

  beforeEach(async () => {
    Comment = CommentModel(sequelize, DataTypes);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should create a Comment instance with default values', async () => {
    const comment = await Comment.create({
      post_id: 1,
      user_name: 'testuser',
      content: 'This is a test comment.',
    });

    expect(comment.id).toBeDefined();
    expect(comment.created_at).toBeInstanceOf(Date);
    expect(comment.post_id).toBe(1);
    expect(comment.user_name).toBe('testuser');
    expect(comment.content).toBe('This is a test comment.');
  });

  test('should not allow null values for required fields', async () => {
    expect.assertions(2);
    try {
      await Comment.create({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('SequelizeValidationError');
    }
  });
});
