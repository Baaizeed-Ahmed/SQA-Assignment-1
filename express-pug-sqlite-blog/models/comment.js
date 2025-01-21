const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        blogPostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.INTEGER, // For nested replies
            allowNull: true,
            defaultValue: null,
        },
    }, {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    });
};
