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

module.exports = {
    sequelize
}