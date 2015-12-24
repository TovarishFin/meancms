var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var pMethod = mongoose.model('pMethod');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/products', function(req,res){
	Product.find({}, function(err, products){
		res.json(products);
	});
});

router.post('/api/products',function(req,res){

});

router.get('/api/pmethods', function(req,res){
	pMethod.find({},function(err, pMethods){
		res.json(pMethods);
		console.log(pMethods);
	});
});

router.post('/api/pmethods', function(req,res){
	
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

module.exports = router;
