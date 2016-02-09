var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.post('/api/orders/approve', function(req,res){
	Order.findByIdAndUpdate(req.body._id, { $set:{orderStatus:2} }, function (err, order){
		if(err){
			console.log(err);
		} else {
			res.json(order);
		};
	});
});

router.post('/api/orders/deny', function(req,res){
	Order.findByIdAndUpdate(req.body._id, { $set:{orderStatus:-2} }, function (err, order){
		if(err){
			console.log(err);
		} else {
			res.json(order);
		};
	});
});

module.exports = router;
