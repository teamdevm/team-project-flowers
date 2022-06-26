const express = require('express');
const controller = require('../controllers/plantController');
const ghMiddle = require('../controllers/middlewares/findGreenhouse');
const plMiddle = require('../controllers/middlewares/findPlant');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/plant')
    .get(ghMiddle.idMiddle('ghId', true),
        ghMiddle.middle,
        controller.getGhPlants)
    .post(ghMiddle.idMiddle('ghId', true),
        ghMiddle.middle,
        controller.createPlant);

router.route('/plant/:id')
    .post(plMiddle.idMiddle('id', false),
        plMiddle.middle,
        controller.updatePlant)
    .get(controller.getPlant)
    .delete(plMiddle.idMiddle('id', false),
        plMiddle.middle,
        controller.deletePlant);

router.use(apiErrorMiddle);

module.exports = router;
