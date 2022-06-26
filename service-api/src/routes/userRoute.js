const express = require('express');
const usrController = require('../controllers/userController');
const usrMiddle = require('../controllers/middlewares/findUser');
const roleController = require('../controllers/userRoleController');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {apiErrorMiddle} = require('../modules/ApiError')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.route('/user')
    .post(usrController.createUser) // Create new user
    .get(usrController.findAllUsers); // Get list of users

router.route('/user/:id')
    .get(usrController.findUser) // Get user's information
    .post(usrController.updateUser) // Update user's information
    .delete(usrController.deleteUser); // Delete user

router.route('/user/role')
    .get(roleController.getRoles); // list of all roles

router.param('id', usrMiddle.idMiddle('id', false));

router.use(apiErrorMiddle);

module.exports = router;
