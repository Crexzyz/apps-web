"use strict";

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
            id: {
                type: DataTypes.STRING(50),
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING
            }
        }
    );
    return User;
}
