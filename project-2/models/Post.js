"use strict";

const Sequelize = require('sequelize');

const MAX_TITLE_LENGTH = 100;
const MAX_ABSTRACT_LENGTH = 400;

module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(MAX_TITLE_LENGTH),
            allowNull: false
        },
        abstract: {
            type: DataTypes.STRING(MAX_ABSTRACT_LENGTH),
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
    });

    return Post;
}

    