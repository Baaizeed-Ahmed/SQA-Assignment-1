const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'), // Ensure the path is correct
});

// Import models
const BlogPost = require('./blogPost')(sequelize);  
const Comment = require('./comment')(sequelize);

// Define relationships
BlogPost.hasMany(Comment, { foreignKey: 'blogPostId', onDelete: 'CASCADE' });
Comment.belongsTo(BlogPost, { foreignKey: 'blogPostId' });

// Export models and Sequelize instance
module.exports = {
    sequelize, // Sequelize instance
    BlogPost,  // BlogPost model
    Comment,   // Comment model
};
