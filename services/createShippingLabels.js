var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var postmaster = require('postmaster-shipping')({
	apiKey: 'tt_MTUyNDEwMDE6dGZ1aUh5Vl84aEwtLW4zdW5BNmlucWpkZEZR',
	password: 'SteelSeries88'
},true);

exports.createShippingLabel = function createShippingLabel(){
	return setInterval(function(){
		Order.find({orderStatus:2},function(err,orders){
			if(err){
				console.log(err);
			} else {
				for(var i=0;i<orders.length;i++){
					var x=orders[i]._id;
					postmaster.v1.shipment.create({
						to: {
							company: 'personal',
							contact: orders[i].cFname+" "+orders[i].cLname,
							line1: orders[i].StoAddr,
							city: orders[i].StoCity,
							state: orders[i].StoState,
							zip_code: orders[i].StoZip,
							phone_no: orders[i].cPhone
						},
						carrier: 'usps',
						service: '2DAY',
						package: {
							weight: .5,
							length: 10,
							width: 6,
							height: 8
						}
					}, function(err, response){
						if(err){
							console.log(err);
							Order.findByIdAndUpdate(x, {$set: {
								orderStatus: -3,
								}},function(err, order){
									if(err){
										console.log(err);
									} else {
										console.log("shipping label no created :"+order);
									}
								});
						} else {
							Order.findByIdAndUpdate(x, {$set: {
								orderStatus: 3,
								tNum: response.tracking[0],
								sLabel:response.packages[0].label_url,
								postID: response.id
								}},function(err, order){
									if(err){
										console.log(err);
									} else {
										console.log("shipping label created :"+order);
									}
								});
							};
						});
					
				};
			}
		});
	},1000*05*1);
}


