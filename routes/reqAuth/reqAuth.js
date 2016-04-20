var express=require('express')
var router=express.Router();
var isLoggedIn = require('../../controllers/loggedin');
router.use('/all',isLoggedIn.isLoggedIn, require('./all/all'));
router.use('/cs', require('./cs/cs'));
router.use('/qa', require('./qa/qa'));
router.use('/admin', require('./admin/admin'));
//probably will need later
//router.use('/', require('./wh/wh'));
//router.use('/', require('./ret/ret'));

module.exports=router;
