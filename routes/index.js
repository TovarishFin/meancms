var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shortid = require('shortid');
var Product = mongoose.model('Product');
var pMethod = mongoose.model('pMethod');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');
var passport = require('passport');
var authController = require('../controllers/auth');
var isLoggedIn = require('../controllers/loggedin');

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
/* take care of users when have passport ready and have everything else built...
router.get('/api/users', function(req,res){
	User.find({},function(err, users){
		res.json(users);
	});
});

router.post('/api/users', function(req,res){
	
});

router.post('/api/users/update', function(req,res){
	
});

router.post('/api/users/delete', function(req,res){
	
});
*/

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

router.post('/api/orders/newStatus', function(req,res){
	Order.findByIdAndUpdate(req.body._id, {$set:{orderStatus: req.body.orderStatus} }, function(err, order){
		if(err){
			console.log(err);
		} else {
			res.json(order);
		};
	});
});

router.get('/login', function(req,res){
	res.render('login');
});

router.post('/login', authController.isAuthenticated);

router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/login');
});

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

router.get('/api/userinfo', function(req,res){
	userInfo={};
	userInfo.username=req.user.username;
	userInfo.usertype=req.user.usertype;
	userInfo.email=req.user.email;
	userInfo._id=req.user._id;
	res.json(userInfo);
});


//catch all other paths noot defined above...
router.get('*', isLoggedIn.isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'MEAN CMS' });
});

module.exports = router;
