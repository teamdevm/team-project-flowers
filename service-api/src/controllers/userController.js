const {User} = require('../models/models');
const {ApiError} = require('../modules/ApiError');
const {Op} = require('sequelize');

const createUser = async (request, response, next) => {
    const { login, email, password, name } = request.body;

    if (login == null || email == null || password == null || name == null) {
        const apiError = new ApiError(400, 'User body is empty', '');
        return next(apiError);
    }

    let user
    try {
        user = await User.findOne({
            where: {
                login: {
                    [Op.eq]: login
                }
            }
        });
    } catch (error) {
        const apiError = new ApiError(500, 'Error on find user by login', error);
        return next(apiError);
    }

    if (user != null) {
        const apiError = new ApiError(400, 'User with same login already exists', '');
        return next(apiError);
    }

    try {
        user = await User.create({
            login,
            password,
            email,
            name
        });
    } catch (error) {
        const apiError = new ApiError(500, 'Error on create user', error);
        return next(apiError);
    }

    response
        .status(201)
        .send(JSON.stringify({
            id: user.id
        }));
}

const findAllUsers = async (request, response, next) => {
    let users;

    try {
        users = await User.findAll();
    } catch (error) {
        const apiError = new ApiError(500, 'Error on select users', error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(users));
};

const findUser = async (request, response, next) => {
    const user = request.user;

    response
        .status(200)
        .send(JSON.stringify(user));
};

const updateUser = async (request, response, next) => {
    const user = request.user;

    const {login, email, password} = request.body;

    let params = [];
    try {
        if (login != null) {
            user.login = login;
            params.push('login');
        }
        if (password != null) {
            user.password = password;
            params.push('password');
        }
        if (email != null) {
            user.email = email;
            params.push('email');
        }

        if (params !== []) {
            await user.save(params)
        }
    } catch (error) {
        const apiError = new ApiError(500, `Error on update user`, error);
        return next(apiError);
    }

    response
        .status(200)
        .end();
}

const deleteUser = async (request, response, next) => {
    const user = request.user;

    try {
        await user.destroy();
    } catch (error) {
        const apiError = new ApiError(500, `Error on delete user`, error);
        return next(apiError);
    }

    response
        .status(204)
        .end();
}

module.exports = {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteUser
}
