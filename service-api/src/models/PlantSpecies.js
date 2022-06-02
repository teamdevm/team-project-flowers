const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PlantSpecies extends Model { }

    PlantSpecies.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            name: {
                type: DataTypes.STRING(80),
                allowNull: false,

                field: 'species'
            },
            idGroup: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_group'
            },
            // waterInterval: {
            //     type: DataTypes
            // }
        },
        {
            sequelize,
            modelName: 'PlantSpecies',
            tableName: 'plants_species',
            timestamps: false
        }
    );

    return PlantSpecies;
};