const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    { 
        title: DataTypes.STRING,
        username: DataTypes.STRING,
        date: DataTypes.DATE,
        body: DataTypes.STRING
    },
    {
        sequelize
    }
);

module.exports = Post;