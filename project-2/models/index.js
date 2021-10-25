/**
 * Database Configuration
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      storage: process.env.DB_STORAGE,
      define: {
          freezeTableName: true,
          timestamps: false
      }
    }
);

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  Role: require('./Role')(sequelize, Sequelize.DataTypes),
  User: require('./User')(sequelize, Sequelize.DataTypes),
  Category: require('./Category')(sequelize, Sequelize.DataTypes),
  Post: require('./Post')(sequelize, Sequelize.DataTypes),
  Comment: require('./Comment')(sequelize, Sequelize.DataTypes),
}

db.User.belongsTo(db.Role, {foreignKey: {allowNull: false}});
db.Role.hasMany(db.User);

db.Post.belongsTo(db.User, {foreignKey: {allowNull: false}});
db.User.hasMany(db.Post);

db.Post.belongsTo(db.Category, {foreignKey: {allowNull: false}});
db.Category.hasMany(db.Post);

db.Post.belongsToMany(db.Category, {through: 'PostCategory'});

db.Comment.belongsTo(db.Post, {foreignKey: {allowNull: false}});
db.Post.hasMany(db.Comment);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});
  
// sequelize.sync({ force: true })
//   .then(() => {
//     db.Category.bulkCreate([
//       {name: 'PHP'},
//       {name: 'JavaScript'},
//       {name: 'C#'},
//     ]);
//     db.Role.bulkCreate([
//       {name: 'Admin'},
//       {name: 'User'}
//     ])
// });

module.exports = db;
