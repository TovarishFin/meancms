var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/api/users',function(req,res){
	newUser = new User(req.body);
	newUser.save(function(err, user){
		if(err){
			console.log(err);
		} else {
			res.json(user)
		};
	});
});

router.get('/api/users', function(req,res){
	User.find({}, function(err,users){
		if(err){
			console.log(err);
		} else {
			res.json(users)
		};
	})
});

module.exports = router;
