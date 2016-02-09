var express=require('express')
var router=express.Router();
var isLoggedIn = require('../../controllers/loggedin');
router.use('/', require('./admin/admin'));
router.use('/', require('./cs/cs'));
router.use('/', require('./qa/qa'));
//probably will need later
//router.use('/', require('./wh/wh'));
//router.use('/', require('./ret/ret'));
router.use('/',isLoggedIn.isLoggedIn, require('./all/all'));
module.exports=router;
