const express = require('express');
const controller = require('../controllers/userController');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/user')
    .post(controller.createUser) // Create new user
    .get(controller.findAllUsers); // Get list of users

router.route('/user/:id')
    .get(controller.findUser) // Get user's information
    .post(controller.updateUser) // Update user's information
    .delete(controller.deleteUser); // Delete user

router.param('id', controller.findUserById);

router.use(apiErrorMiddle);

module.exports = router;