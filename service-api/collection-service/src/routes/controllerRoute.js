const express = require('express');
// const controller = require('../controllers/userController');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/roles')
    .get() //

router.route('/role/:roleId')
    .get(); //

router.route('/collection')
    .get();

router.route('/collection/user/:userId')
    .get()
    .post()
    .delete();

router.route('/collection/greenhouse/:ghId')
    .get()
    .post()
    .delete();

router.param('id', controller.findUserById);

router.use(apiErrorMiddle);

module.exports = router;