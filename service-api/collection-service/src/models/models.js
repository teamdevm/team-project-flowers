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

const role = require('./UserRole');
const collection = require('./Collection')

const Role = role(sequelize, DataTypes);
const Collection = collection(sequelize, DataTypes);



module.exports = {
    sequelize,
    Role,
    Collection
}