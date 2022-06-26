const {ApiError} = require("../../modules/ApiError");
const {Greenhouse} = require("../../models/models");

const findGreenHouse = async (request, response, next) => {
    const id = request.ghId;

    if (id == null) {
        const apiError = new ApiError(400, `Greenhouse id is empty`, '');
        return next(apiError);
    }

    let greenhouse;
    try {
        greenhouse = await Greenhouse.findByPk(id);
    } catch (error) {
        const apiError = new ApiError(500, `Error on find greenhouse with id ${id}`, error);
        return next(apiError);
    }

    if (greenhouse == null) {
        const apiError = new ApiError(404, `Greenhouse with id ${id} not founded`, '');
        return next(apiError);
    }

    request.greenhouse = greenhouse;
    next();
};

function getGhId(paramName, isQuery) {
    if (isQuery) {
        return async (request, response, next) => {
            request.ghId = request.query[paramName];
            next();
        }
    } else {
        return async (request, response, next) => {
            request.ghId = request.params[paramName];
            next();
        }
    }
}

module.exports = {
    middle: findGreenHouse,
    idMiddle: getGhId
}

