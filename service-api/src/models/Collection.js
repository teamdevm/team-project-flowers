const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Collection extends Model { }

    Collection.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            idUser: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_user'
            },
            idGreenhouse: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_greenhouse'
            },
            idRole: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_role'
            },
            ghName: {
                type: DataTypes.STRING(50),
                allowNull: false,

                field: 'greenhouse_name'
            }
        },
        {
            sequelize,
            modelName: 'Collection',
            tableName: 'collection',
            timestamps: false
        }
    );

    return Collection;
};