var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var shortid = require('shortid');

router.get('/api/orders', function(req,res){
	Order.find({}, function(err, orders){
		res.json(orders);
	});
});

router.post('/api/orders', function(req,res,next){
	orderGenesis={
		prodName: 0,
		pMethod: 0,
		prodPrice: 0,
		orderStatus: 0,
		cFname: 0,
		cLname: 0,
		ccNumber: 0,
		ccExpDate: 0,
		ccCode: 0,
		BtoAddr: 0,
		BtoCity: 0,
		BtoState: 0,
		BtoZip: 0,
		BtoCountry: 0,
		StoAddr: 0,
		StoCity: 0,
		StoState: 0,
		StoZip: 0,
		StoCountry: 0,
		orderID: 0,
		cPhone: 0,
		tNum: 0,
		sLabel: 0,
		postID:0,
		user:0,
		date:0
	}
	newOrder=new Order(req.body);
	console.log(newOrder.prodName);
	newOrder.orderID=shortid.generate();
	for(var x in orderGenesis){
		if(!newOrder[x]){
			newOrder[x]=orderGenesis[x];
		};
	};
	console.log(newOrder);
	newOrder.save(function(err, order){
		if(err){
			console.log(err);
		} else {
			res.json(order);
		}
	});
});

router.post('/api/orders/update',function(req,res){
		Order.findByIdAndUpdate(req.body._id, { $set:req.body }, function (err, order){
		if(err){next(err);}
		res.json(order);
	});
});

router.post('/api/orders/delete', function(req,res){
	Order.findOneAndRemove({'_id':req.body._id},function(err, order){
		if(err){next(err);}
		res.json(order);
	});
});

//get all orders in a given order status...
router.get('/api/orders/:orderStatus', function(req,res){
	Order.find({orderStatus: req.params.orderStatus}, function(err, orders){
		res.json(orders);
	});
});

module.exports = router;
