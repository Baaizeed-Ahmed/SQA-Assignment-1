const { Sequelize, DataTypes } = require('sequelize');
const BlogPostModel = require('../../models/index');

describe('BlogPost Model', () => {
  let sequelize;
  let BlogPost;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
  });

  beforeEach(async () => {
    BlogPost = BlogPostModel(sequelize, DataTypes);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should create a BlogPost instance with valid attributes', async () => {
    const blogPost = await BlogPost.create({
      title: 'Sample Title',
      content: 'This is the sample content of the blog post.',
      author: 'Author Name'
    });

    expect(blogPost.id).toBeDefined();
    expect(blogPost.title).toBe('Sample Title');
    expect(blogPost.content).toBe('This is the sample content of the blog post.');
    expect(blogPost.author).toBe('Author Name');
    expect(blogPost.createdAt).toBeInstanceOf(Date);
    expect(blogPost.updatedAt).toBeInstanceOf(Date);
  });

  test('should not allow null values for required fields', async () => {
    expect.assertions(2);
    try {
      await BlogPost.create({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  test('should update the updatedAt field on update', async () => {
    const blogPost = await BlogPost.create({
      title: 'Sample Title',
      content: 'This is the content.',
      author: 'Author Name'
    });

    const initialUpdatedAt = blogPost.updatedAt;

    await new Promise(r => setTimeout(r, 1000));

    await blogPost.update({ title: 'Updated Title' });

    expect(blogPost.updatedAt).toBeGreaterThan(initialUpdatedAt);
  });
});
