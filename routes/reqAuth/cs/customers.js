var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var shortid = require('shortid');

router.get('/api/customers', function(req,res){
	Customer.find({},function(err, users){
		res.json(users);
	});
});

router.post('/api/customers', function(req,res,next){
	console.log(req.body);
	newCustomer=new Customer(req.body);
	newCustomer.customerID=shortid.generate();
	newCustomer.save(function(err, customer){
		if(err){console.log(err);}
		res.json(customer);
	});
});

router.post('/api/customers/update', function(req,res,next){
	Customer.findByIdAndUpdate(req.body._id, { $set:req.body }, function (err, customer){
		if(err){next(err);}
		res.json(customer);
	});
});

router.post('/api/customers/delete', function(req,res,next){
	Customer.findOneAndRemove({'_id':req.body._id},function(err, customer){
		if(err){next(err);}
		res.json(customer);
	});
});

module.exports = router;
