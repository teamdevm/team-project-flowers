const express = require('express');
// const controller = require('./controller');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');

const router = express.Router();

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(express.json());

router.route('/user')
    .post() // Create new user
    .get(); // Get list of users

router.route('/user/:id')
    .get() // Get user's information
    .post() // Update user's information
    .delete(); // Delete user

module.exports = router;