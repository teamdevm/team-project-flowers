const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../configs/flowersDB');

const sequelize = new Sequelize(
    connection.database,
    connection.user,
    connection.password,
    {
        host: connection.host,
        port: connection.port,
        dialect: connection.dialect
    }
);

const user = require('./User');

const User = user(sequelize, DataTypes);

module.exports = {
    sequelize,
    User
}