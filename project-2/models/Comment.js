"use strict";

const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define('Comment', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: DataTypes.STRING(200),
                allowNull: false
            }
        }
    );
    return Comment;
}
