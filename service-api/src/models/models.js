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
const collection = require('./Collection');
const greenhouse = require('./Greenhouse');
const userRole = require('./UserRole');
const plant = require('./Plant');
const plantGroup = require('./PlantGroup');
const plantSpecies = require('./PlantSpecies');

const User = user(sequelize, DataTypes);
const Collection = collection(sequelize, DataTypes);
const Greenhouse = greenhouse(sequelize, DataTypes);
const UserRole = userRole(sequelize, DataTypes);
const Plant = plant(sequelize, DataTypes);
const PlantGroup = plantGroup(sequelize, DataTypes);
const PlantSpecies = plantSpecies(sequelize, DataTypes);

PlantGroup.hasMany(PlantSpecies, {as: 'species', foreignKey: 'idGroup'});
PlantSpecies.belongsTo(PlantGroup, {as: 'group', foreignKey: 'idGroup'});

Plant.belongsTo(PlantSpecies, {as: 'species', foreignKey: 'idSpecies'});

Greenhouse.belongsToMany(User, {
    as: 'users',
    through: Collection,
    foreignKey: 'id_greenhouse'
});

User.belongsToMany(Greenhouse, {
    as: 'greenhouses',
    through: Collection,
    foreignKey: 'id_user'
});

Greenhouse.hasMany(Plant, {as: 'plants', foreignKey: 'idGreenhouse'});
Plant.belongsTo(Greenhouse, {as: 'greenhouse', foreignKey: 'idGreenhouse'});

Collection.belongsTo(UserRole, {as: 'userRole', foreignKey: 'idRole'});

module.exports = {
    sequelize,
    User,
    PlantGroup,
    PlantSpecies,
    Plant,
    Greenhouse,
    UserRole,
    Collection
}
