const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        /*
         *  Helper method for defining associations.
         *  This method is not a part of Sequelize lifecycle.
         *  The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Collection.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_user'
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_role'
            },
            greenHouseId: {
                type: DataTypes.INTEGER,
                allowNull: false,

                field: 'id_greenhouse'
            },
            greenHouseName: {
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