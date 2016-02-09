var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

//get rid of when done with single route
router.post('/api/payments', function(req,res){
	//need to get different api than stripe to get that shit working in here...
	//in the meantime i am going to juse simulate that it went fine and payment went through along with moving to new status...
	Order.findByIdAndUpdate(req.body._id, { $set:{orderStatus:1} }, function (err, order){
		if(err){
			console.log(err);
		} else {
			res.json(order);
		};
	});
});

module.exports = router;
