var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var pMethod = mongoose.model('pMethod');

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

router.post('/api/pmethods/update', function(req, res, next){
	pMethod.findByIdAndUpdate(req.body._id, { $set: {
		type: req.body.type
	}}, function (err, pMethod){
		if(err){next(err);}
		res.json(pMethod);
	});
});

router.post('/api/pmethods/delete', function(req,res, next){
	pMethod.findOneAndRemove({'_id':req.body._id},function(err, method){
		if(err){next(err);}
		res.json(method);
	});
});

module.exports = router;
