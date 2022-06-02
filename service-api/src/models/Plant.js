const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Plant extends Model { }

    Plant.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            idSpecific: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_specific'
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,

                field: 'name'
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,

                field: 'created_at'
            },
            lastWater: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,

                field: 'last_water'
            },
            idGreenhouse: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_greenhouse'
            }
        },
        {
            sequelize,
            modelName: 'Plant',
            tableName: 'plants',
            timestamps: false
        }
    );

    return Plant;
};