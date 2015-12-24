var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var pMethod = mongoose.model('pMethod');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');

router.get('/api/products', function(req,res){
	Product.find({}, function(err, products){
		res.json(products);
	});
});

router.post('/api/products',function(req,res, next){
	product=new Product(req.body);
	product.save(function(err,product){
		if(err){next(err);}
		res.json(product);
	});
});

router.post('/api/products/delete', function(req,res, next){
	console.log(req.body._id);
	Product.findOneAndRemove({'_id':req.body._id},function(err,product){
		if(err){ next(err);}
		res.json(product);
	});
});

router.get('/api/pmethods', function(req,res){
	pMethod.find({},function(err, pMethods){
		res.json(pMethods);
	});
});

router.post('/api/pmethods', function(req,res, next){
	newPmethod=new pMethod(req.body);
	newPmethod.save(function(err, method){
		if(err){next(err);}
		res.json(method);
		console.log(method);
	});
});

router.post('/api/pmethods/delete', function(req,res, next){
	pMethod.findOneAndRemove({'_id':req.body._id},function(err, method){
		if(err){next(err);}
		res.json(method);
	});
});

router.get('/api/users', function(req,res){
	User.find({},function(err, users){
		res.json(users);
	});
});

router.post('/api/users', function(req,res){
	
});

router.get('/api/customers', function(req,res){
	Customer.find({},function(err, users){
		res.json(users);
	});
});

router.post('/api/custoers', function(req,res){
	
});

router.get('/api/orders', function(req,res){
	Order.find({}, function(err, orders){
		res.json(orders);
	});
});

router.post('api/orders', function(req,res){
	
});

router.get('*', function(req, res, next) {
  res.render('index', { title: 'MEAN CMS' });
});

module.exports = router;
