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

const plant = require('./Plant');
const plantGroup = require('./PlantGroup');
const plantSpecies = require('./PlantSpecies');
const Plant = plant(sequelize, DataTypes);
const PlantGroup = plantGroup(sequelize, DataTypes);
const PlantSpecies = plantSpecies(sequelize, DataTypes);

PlantGroup.hasMany(PlantSpecies, {as: 'species', foreignKey: 'idGroup'});
PlantSpecies.belongsTo(PlantGroup, {as: 'group', foreignKey: 'idGroup'});

PlantSpecies.hasMany(Plant, {as: 'plants', foreignKey: 'idSpecies'});
Plant.belongsTo(PlantSpecies, {as: 'species', foreignKey: 'idSpecies'});

module.exports = {
    sequelize,
    User,
    PlantGroup,
    PlantSpecies,
    Plant
}