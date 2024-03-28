const express = require('express');
const homeControllers = require('../controllers/homeController');


const router = express.Router();
let control = new homeControllers();

router.get('/', control.homeView);

module.exports = router;