const express = require('express');
const controller = require('../controllers/plGroupsController');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/plant/group')
    .get(controller.getGroups); // Get list of users

router.route('/plant/group/species')
    .get(controller.getGroupsSpecies); // Get list of users

router.route('/plant/group/:id')
    .get(controller.getGroup); // Get list of users

router.route('/plant/group/:id/species')
    .get(controller.getGroupSpecies); // Get list of users

router.use(apiErrorMiddle);

module.exports = router;