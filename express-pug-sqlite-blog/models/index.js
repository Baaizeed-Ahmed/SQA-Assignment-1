const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { all } = require('../routes/blog');

const BlogPost = sequelize.define('BlogPost', {
  
      id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = { sequelize, BlogPost };