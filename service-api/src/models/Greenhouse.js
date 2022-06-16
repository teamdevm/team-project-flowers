const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Greenhouse extends Model { }

    Greenhouse.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,

                field: 'created_at'
            }
        },
        {
            sequelize,
            modelName: 'Greenhouse',
            tableName: 'greenhouses',
            timestamps: false
        }
    );

    return Greenhouse;
};