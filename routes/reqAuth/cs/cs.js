var express = require('express');
var router = express.Router();
var reqUserType = require('../../../controllers/loggedin').reqUserType;

router.use(reqUserType('cs'));
router.use(require('./customers'));
router.use(require('./orders'));
router.use(require('./payments'));

module.exports = router;
