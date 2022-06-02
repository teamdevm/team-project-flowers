const {Model} = require('sequelize');
const {getHash} = require('../modules/passwHash');

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,

                field: 'id'
            },
            login: {
                type: DataTypes.STRING(32),
                allowNull: false,

                field: 'login'
            },
            email: {
                type: DataTypes.STRING(320),
                allowNull: false,

                field: 'email'
            },
            password: {
                type: DataTypes.STRING(60),
                allowNull: false,

                field: 'password',

                set(value) {
                    try {
                        this.setDataValue('password', getHash(value));
                    } catch (error) {
                        throw error;
                    }
                }
            },
            name: {
                type: DataTypes.STRING(60),
                allowNull: false,

                field: 'name'
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
            modelName: 'User',
            tableName: 'users',
            timestamps: false
        }
    );

    return User;
};