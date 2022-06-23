const {PlantSpecies} = require('../models/models');
const {ApiError} = require('../modules/ApiError');
const {Op} = require('sequelize');

const getAllSpecies = async (request, response, next) => {
    let species
    try {
        species = await PlantSpecies.findAll();
    } catch (error) {
        const apiError = new ApiError(500, 'Error on get list of species', error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(species));
};

const getSpecies = async (request, response, next) => {
    const id = request.params.id;

    if (id == null) {
        const apiError = new ApiError(400, `Bad species id`, '');
        return next(apiError);
    }

    let species
    try {
        species = await PlantSpecies.findByPk(id);
    } catch (error) {
        const apiError = new ApiError(500, 'Error on find species by id', error);
        return next(apiError);
    }

    if (species == null) {
        const apiError = new ApiError(404, `Species with id ${id} not founded`, '');
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(species));
};

module.exports = {
    getAllSpecies,
    getSpecies
}