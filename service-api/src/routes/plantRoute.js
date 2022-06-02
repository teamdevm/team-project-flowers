const express = require('express');
const controller = require('../controllers/plantController');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/plant/:id')
    .post(controller.updatePlant) // Create new user
    .get(controller.getPlant) // Get list of users
    .delete(controller.deletePlant);

router.param('id', controller.findPlantById);

router.use(apiErrorMiddle);

module.exports = router;