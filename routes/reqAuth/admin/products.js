var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

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

router.post('/api/products/update', function(req, res, next){
	Product.findByIdAndUpdate(req.body._id, { $set: { 
			prodName: req.body.prodName,
			prodCode: req.body.prodCode,
			prodPrice: req.body.prodPrice
			}}, function (err, product) {
		if (err) {next(err);}
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

module.exports = router;
