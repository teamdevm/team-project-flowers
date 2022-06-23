const {UserRole} = require('../models/models');
const {ApiError} = require('../modules/ApiError');
const {Op} = require('sequelize');

const getRoles = async (request, response, next) => {
    let roles;
    try {
        roles = await UserRole.findAll();
    } catch (error) {
        const apiError = new ApiError(500, 'Error on get roles', error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(roles));
}

const getRole = async (request, response, next) => {
    const id = request.params.id;

    if (id == null) {
        const apiError = new ApiError(400, `Bad role id`, '');
        return next(apiError);
    }

    let role;
    try {
        role = await UserRole.findByPk(id);
    } catch (error) {
        const apiError = new ApiError(500, 'Error on find role', error);
        return next(apiError);
    }

    if (role == null) {
        const apiError = new ApiError(404, `Role with id ${id} not founded`, '');
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(role));
};

module.exports = {
    getRole,
    getRoles
}