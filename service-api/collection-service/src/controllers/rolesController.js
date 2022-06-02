const {Role} = require('../models/models');
const {ApiError} = require('../modules/ApiError');

const getRoles = async (request, response, next) => {
    let roles;
    try {
        roles = await Role.findAll();
    } catch (error) {
        const apiError = new ApiError('500', 'Error on select roles', '');
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(roles));
};

const getRole = async (request, response, next) => {
    const id = request.params.id;

    if (id == null) {
        const apiError = new ApiError(400, `Bad role id`, '');
        return next(apiError);
    }

    let role;
    try {
        role = await Role.findByPk(id);
    } catch (error) {
        const apiError = new ApiError('500', 'Error on find role', '');
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(role));
};