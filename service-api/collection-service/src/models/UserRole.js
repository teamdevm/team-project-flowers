const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GreenHouseRole extends Model {
        /*
         *  Helper method for defining associations.
         *  This method is not a part of Sequelize lifecycle.
         *  The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    GreenHouseRole.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            role: {
                type: DataTypes.STRING(30),
                allowNull: false,

                field: 'role'
            }
        },
        {
            sequelize,
            modelName: 'GreenHouseRole',
            tableName: 'roles'
        }
    );

    return GreenHouseRole;
};