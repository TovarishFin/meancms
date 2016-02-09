var express=require('express'),
router=express.Router();
router.use(require('./login'));
router.use(require('./unauthorized'));
module.exports=router;
