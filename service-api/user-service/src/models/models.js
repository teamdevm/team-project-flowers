const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../configs/flowersDB');

const sequelize = new Sequelize(
    connection.schema,
    connection.user,
    connection.password,
    {
        host: connection.host,
        port: connection.port,
        dialect: connection.dialect
    }
);

const user = require('./User');
const greenHouseRoles = require('./GreenHouseRole');
const collection = require('./Collection');

const User = user(sequelize, DataTypes);
const GreenHouseRoles = greenHouseRoles(sequelize, DataTypes);
const Collection = collection(sequelize, DataTypes);

Collection.hasMany(User, {foreignKey: ''});
Collection.hasMany(GreenHouseRoles, {foreignKey: ''});

module.exports = {
    User,
    GreenHouseRoles,
    Collection
}