"use strict";

module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });
    return Category;
}
