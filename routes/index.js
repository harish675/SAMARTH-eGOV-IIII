
const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');


router.use('/item',require('./item'));
router.get('/',homeController.homePage);


module.exports = router;