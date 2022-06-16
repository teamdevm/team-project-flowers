const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model { }

    UserRole.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,

                field: 'role'
            }
        },
        {
            sequelize,
            modelName: 'UserRole',
            tableName: 'roles',
            timestamps: false
        }
    );

    return UserRole;
};