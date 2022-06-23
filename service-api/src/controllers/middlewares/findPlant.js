const {ApiError} = require("../../modules/ApiError");
const {Plant} = require("../../models/models");

const findPlant = async (request, response, next) => {
    const id = request.plId;

    if (id == null) {
        const apiError = new ApiError(400, `Empty plant id`, '');
        return next(apiError);
    }

    let plant;
    try {
        plant = await Plant.findByPk(id);
    } catch (error) {
        const apiError = new ApiError(500, `Error on find plant by id`, error);
        return next(apiError);
    }

    if (plant == null) {
        const apiError = new ApiError(404, `Plant with id ${id} not founded`, '');
        return next(apiError);
    }

    request.plant = plant;
    next();
};

function getPlId(paramName, isQuery) {
    if (isQuery) {
        return async (request, response, next) => {
            request.plId = request.query[paramName];
            next();
        }
    } else {
        return async (request, response, next) => {
            request.plId = request.params[paramName];
            next();
        }
    }
}

module.exports = {
    middle: findPlant,
    idMiddle: getPlId
}
