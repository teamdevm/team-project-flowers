const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PlantGroup extends Model { }

    PlantGroup.init(
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

                field: 'group'
            }
        },
        {
            sequelize,
            modelName: 'PlantGroup',
            tableName: 'plants_groups',
            timestamps: false
        }
    );

    return PlantGroup;
};