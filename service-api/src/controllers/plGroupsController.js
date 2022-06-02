const {PlantGroup} = require('../models/models');
const {ApiError} = require('../modules/ApiError');
const {Op} = require('sequelize');

const getGroups = async (request, response, next) => {
    let groups
    try {
        groups = await PlantGroup.findAll();
    } catch (error) {
        const apiError = new ApiError(500, 'Error on get list of groups', error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(groups));
};

const getGroupsSpecies = async (request, response, next) => {
    let groups
    try {
        groups = await PlantGroup.findAll({include: 'species'});
    } catch (error) {
        const apiError = new ApiError(500, 'Error on get list of groups with species', error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(groups));
};

const getGroup = async (request, response, next) => {
    const id = request.params.id;

    let group
    try {
        group = await PlantGroup.findByPk(id);
    } catch (error) {
        const apiError = new ApiError(500, 'Error on find group by id', error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(group));
};

const getGroupSpecies = async (request, response, next) => {
    const id = request.params.id;

    let group
    try {
        group = await PlantGroup.findByPk(id, {include: 'species'});
    } catch (error) {
        const apiError = new ApiError(500, 'Error on find group by id with species', error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(group));
};

module.exports = {
    getGroup,
    getGroups,
    getGroupSpecies,
    getGroupsSpecies
}