var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.post('/api/orders/newStatus', function(req,res){
	Order.findByIdAndUpdate(req.body._id, {$set:{orderStatus: req.body.orderStatus} }, function(err, order){
		if(err){
			console.log(err);
		} else {
			res.json(order);
		};
	});
});



router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/login');
});



router.get('/api/userinfo', function(req,res){
	userInfo={};
	userInfo.username=req.user.username;
	userInfo.usertype=req.user.usertype;
	userInfo.email=req.user.email;
	userInfo._id=req.user._id;
	res.json(userInfo);
});

module.exports = router;
