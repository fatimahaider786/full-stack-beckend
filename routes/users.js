const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/users');

router.post('/login', login);
router.post('/sign-up', register);

module.exports = router;