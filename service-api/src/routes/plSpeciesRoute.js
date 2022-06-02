const express = require('express');
const controller = require('../controllers/plSpeciesController');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/plant/species')
    .get(controller.getAllSpecies); // Get list of users

router.route('/plant/species/:id')
    .get(controller.getSpecies); // Get list of users

router.use(apiErrorMiddle);

module.exports = router;