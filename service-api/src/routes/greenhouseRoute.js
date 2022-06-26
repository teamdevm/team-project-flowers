const express = require('express');
const controller = require('../controllers/greenhouseController');
const findUser = require('../controllers/middlewares/findUser');
const findGh = require('../controllers/middlewares/findGreenhouse');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/greenhouse')
    .post(findUser.idMiddle('usrId', true),
        findUser.middle,
        controller.createGreenhouse) // create greenhouse
    .get(findUser.idMiddle('usrId', true),
        findUser.middle,
        controller.getAllGreenhouse); // list of all user greenhouses

router.route('/greenhouse/:id/user')
    .get(findGh.idMiddle('id', false),
        findGh.middle,
        controller.getGhUsers); // list of users in greenhouse

router.use(apiErrorMiddle);

module.exports = router;
