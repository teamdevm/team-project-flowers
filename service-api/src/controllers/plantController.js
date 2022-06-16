const {Plant, PlantSpecies, PlantGroup} = require('../models/models');
const {ApiError} = require('../modules/ApiError');
const {Op} = require('sequelize');

// collection middleware before
const createPlant = async (request, response, next) => {
    const greenhouse = request.params.greenhouse;
    const {name, idSpecies, lastWater} = request.body;

    if (name == null || idSpecies == null) {
        const apiError = new ApiError(400, 'Plant body is empty', '');
        return next(apiError);
    }

    let species;
    try {
        species = await PlantSpecies.findByPk(idSpecies);
    } catch (error) {
        const apiError = new ApiError(500, `Error on find species`, error);
        return next(apiError);
    }

    if (species == null) {
        const apiError = new ApiError(400, `Species with ${idSpecies} doesn't exist`, '');
        return next(apiError);
    }

    let plant;
    try {
        plant = await Plant.create({
            name,
            idGreenhouse: greenhouse.id,
            idSpecies,
            lastWater: lastWater == null ? lastWater : null
        });
    } catch (error) {

    }

    response
        .status(201)
        .send(JSON.stringify({
            id: plant.id
        }))
}

const getGhPlants = async (request, response, next) => {
    const greenhouse = request.greenhouse;

    let plants;
    try {
        plants = await greenhouse.getPlants({
            joinTableAttributes: ['ghName']
        });
    } catch (error) {
        const apiError = new ApiError(500, `Error on select plants in greenhouse with id ${greenhouse.id}`, error);
        return next(apiError);
    }

    response
        .status(200)
        .send(JSON.stringify(plants));
}

const getPlant = async (request, response, next) => {
    const plant = request.plant;

    response
        .status(200)
        .send(JSON.stringify(request.plant));
}

const updatePlant = async (request, response, next) => {
    const plant = request.plant;
    const {name, lastWater, idSpecies} = request.body;

    let species;
    try {
        species = await PlantSpecies.findByPk(idSpecies);
    } catch (error) {
        const apiError = new ApiError(500, `Error on find species`, error);
        return next(apiError);
    }

    if (species == null) {
        const apiError = new ApiError(400, `Species with ${idSpecies} doesn't exist`, '');
        return next(apiError);
    }

    let params = [];
    try {
        if (name != null) {
            plant.name = name;
            params.push('name');
        }
        if (lastWater != null) {
            plant.lastWater = lastWater;
            params.push('lastWater');
        }
        if (idSpecies != null) {
            plant.idSpecies = idSpecies;
            params.push('idSpecies');
        }

        if (params !== []) {
            await plant.save(params)
        }
    } catch (error) {
        const apiError = new ApiError(500, `Error on update plant`, error);
        return next(apiError);
    }

    response
        .status(200)
        .end();
}

const deletePlant = async (request, response, next) => {
    const plant = request.plant;

    try {
        await plant.destroy();
    } catch (error) {
        const apiError = new ApiError(500, `Error on delete plant`, error);
        return next(apiError);
    }

    response
        .status(204)
        .end();
}

module.exports = {
    createPlant,
    getGhPlants,
    getPlant,
    updatePlant,
    deletePlant
}
