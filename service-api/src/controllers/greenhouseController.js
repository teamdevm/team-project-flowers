const {Greenhouse, User, Plant, Collection, sequelize} = require('../models/models');
const {ApiError} = require('../modules/ApiError');
const {Op} = require('sequelize');

const createGreenhouse = async (request, response, next) => {
    const user = request.user;
    const {name} = request.body;

    let usrGhs;
    try {
        usrGhs = await Collection.findOne({
            where: {
                idUser: user.id,
                ghName: name
            }
        });
    } catch (error) {
        const apiError = new ApiError(500, `Error on get user with id ${user.id} list of greenhouses`,
            error);
        return next(apiError);
    }

    if (usrGhs != null) {
        const apiError = new ApiError(400, `User with id ${user.id} already have greenhouse with name ${name}`, '');
        return next(apiError);
    }

    let greenHouse;
    const tr = await sequelize.transaction();

    try {
        greenHouse = await Greenhouse.create();
        await user.addGreenhouses(greenHouse, {
            through: {
                idUser: user.id,
                ghName: name,
                idRole: 1
            }
        });

        await tr.commit();
    } catch (error) {
        await tr.rollback();
        const apiError = new ApiError(500, `Error on creating greenhouse for user with id ${user.id}`, error);
        return next(apiError);
    }

    response
        .status(201)
        .send(JSON.stringify({
            id: greenHouse.id,
            name: name
        }));
};

const getAllGreenhouse = async (request, response, next) => {
    const user = request.user;

    let greenhouses;
    try {
        greenhouses = await user.getGreenhouses({
            joinTableAttributes: ['ghName']
        });
    } catch (error) {
        const apiError = new ApiError(500, `Error on select greenhouses for user with id ${user.id}`, error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(greenhouses));
};

const getGhUsers = async (request, response, next) => {
    const greenhouse = request.greenhouse;

    let users
    try {
        users = await greenhouse.getUsers();
    } catch (error) {
        const apiError = new ApiError(500, '', error);
        return next(apiError);
    }

    console.log(greenhouse);

    response
        .status(200)
        .send(JSON.stringify(users));
}

module.exports = {
    createGreenhouse,
    getAllGreenhouse,
    getGhUsers
}
