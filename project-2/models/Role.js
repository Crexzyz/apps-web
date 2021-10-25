"use strict";

module.exports = function(sequelize, DataTypes) {
    const Role = sequelize.define('Role', {
            name: {
                type: DataTypes.STRING,
                primaryKey: true
            }
        }
    );
    return Role;
}
