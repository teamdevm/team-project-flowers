const {Plant, PlantSpecies, PlantGroup} = require('../models/models');
const {ApiError} = require('../modules/ApiError');
const {Op} = require('sequelize');

const createPlant = async (request, response, next) => {
    const greenhouse = request.greenhouse;
    const {name, idSpecies, lastWater} = request.body;

    if (name == null || idSpecies == null) {
        const apiError = new ApiError(400, 'Plant body is empty', '');
        return next(apiError);
    }

    // name validation
    let notEmptyName = name.trim();
    if (notEmptyName === '') {
        const apiError = new ApiError(400, 'Name is empty', '');
        return next(apiError);
    }

    if (notEmptyName.length > 25) {
        const apiError = new ApiError(400, 'Long plant name', '');
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
        plant = await Plant.findOne({
            where: {
                name: notEmptyName,
                idGreenhouse: greenhouse.id
            }
        });

        if (plant != null) {
            const apiError = new ApiError(400, `Greenhouse with id ${greenhouse.id} already has plant with name ${notEmptyName}`, '');
            return next(apiError);
        }

        plant = await Plant.create({
            name: notEmptyName,
            idGreenhouse: greenhouse.id,
            idSpecies,
            lastWater: lastWater == null ? lastWater : null
        });
    } catch (error) {
        const apiError = new ApiError(500, `Error on creating plant in greenhouse with id ${greenhouse.id}`, error);
        return next(apiError);
    }

    response
        .status(201)
        .json({ id: plant.id });
}

const getGhPlants = async (request, response, next) => {
    const greenhouse = request.greenhouse;

    let plants;
    try {
        plants = await greenhouse.getPlants({
            attributes: [
                'id', 'name'
            ]
        });
    } catch (error) {
        const apiError = new ApiError(500, `Error on select plants in greenhouse with id ${greenhouse.id}`, error);
        return next(apiError);
    }

    response
        .status(200)
        .json(plants);
}

const getPlant = async (request, response, next) => {
    const {id} = request.params;

    let plant;
    try {
        plant = await Plant.findByPk(id, {
            attributes: ['id', 'name', 'createdAt', 'idGreenhouse', 'lastWater'],
            include: {
                association: 'species',
                attributes: ['id', 'name'],
                include: {
                    association: 'group',
                    attributes: ['id', 'name']
                }
            },
        });
    } catch (error) {
        const apiError = new ApiError(500, `Error on select plants in greenhouse with id ${greenhouse.id}`, error);
        return next(apiError);
    }

    if (plant == null) {
        const apiError = new ApiError(404, `Plant with ${id} not founded`, '');
        return next(apiError);
    }

    response
        .status(200)
        .json(plant);
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
            // name validation
            let notEmptyName = name.trim();
            if (notEmptyName === '') {
                const apiError = new ApiError(400, 'Name is empty', '');
                return next(apiError);
            }

            if (notEmptyName.length > 25) {
                const apiError = new ApiError(400, 'Long plant name', '');
                return next(apiError);
            }

            plant.name = notEmptyName;
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
