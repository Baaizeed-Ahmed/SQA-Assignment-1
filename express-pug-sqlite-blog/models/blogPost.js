const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize) => {
    return sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    });
};