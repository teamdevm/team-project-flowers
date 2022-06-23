const {ApiError} = require("../../modules/ApiError");
const {User} = require("../../models/models");

const findUser = async (request, response, next) => {
    const usrId = request.usrId;

    if (usrId == null) {
        const apiError = new ApiError(400, `User id is empty`, '');
        return next(apiError);
    }

    let user;
    try {
        user = await User.findByPk(usrId);
    } catch (error) {
        const apiError = new ApiError(500, `Error on find user with id ${usrId}`, error);
        return next(apiError);
    }

    if (user == null) {
        const apiError = new ApiError(404, `User with id ${usrId} not founded`, '');
        return next(apiError);
    }

    request.user = user;
    next();
};

function getUserId(paramName, isQuery) {
    if (isQuery) {
        return async (request, response, next) => {
            request.usrId = request.query[paramName];
            next();
        }
    } else {
        return async (request, response, next) => {
            request.usrId = request.params[paramName];
            next();
        }
    }
}

module.exports = {
    middle: findUser,
    idMiddle: getUserId
};
