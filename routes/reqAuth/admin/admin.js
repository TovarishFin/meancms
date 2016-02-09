var express=require('express')
var router=express.Router();
var reqUserType = require('../../../controllers/loggedin').reqUserType
router.use(reqUserType('admin'));
router.use(require('./users'));
router.use(require('./products'));
router.use(require('./pmethods'));

module.exports=router;
