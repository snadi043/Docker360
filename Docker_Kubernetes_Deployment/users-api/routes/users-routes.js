const express = require('express');

const userActions = require('../controllers/users-action');

const router = express.Router();

router.post('/login', userActions.verifyUser);

router.post('/signup', userActions.createUser);

module.exports = router;